import React from 'react';

export const cryptoOptions = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', network: 'Bitcoin', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', icon: '₿', binanceSymbol: 'BTCUSDT' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', network: 'ERC20', address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', icon: 'Ξ', binanceSymbol: 'ETHUSDT' },
    { id: 'usdt-erc20', name: 'USDT (ERC20)', symbol: 'USDT', network: 'Ethereum', address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', icon: '₮', binanceSymbol: 'USDTUSDT' },
    { id: 'usdt-trc20', name: 'USDT (TRC20)', symbol: 'USDT', network: 'Tron', address: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE', icon: '₮', binanceSymbol: 'USDTUSDT' },
    { id: 'ltc', name: 'Litecoin', symbol: 'LTC', network: 'Litecoin', address: 'ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', icon: 'Ł', binanceSymbol: 'LTCUSDT' },
    { id: 'sol', name: 'Solana', symbol: 'SOL', network: 'Solana', address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', icon: '◎', binanceSymbol: 'SOLUSDT' },
    { id: 'usdt-bep20', name: 'USDT (BEP20)', symbol: 'USDT', network: 'BSC', address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', icon: '₮', binanceSymbol: 'USDTUSDT' },
    { id: 'bnb', name: 'BNB', symbol: 'BNB', network: 'BSC', address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', icon: '⬡', binanceSymbol: 'BNBUSDT' },
    { id: 'ada', name: 'Cardano', symbol: 'ADA', network: 'Cardano', address: 'addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', icon: '₳', binanceSymbol: 'ADAUSDT' },
    { id: 'xrp', name: 'XRP', symbol: 'XRP', network: 'XRP Ledger', address: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH', icon: '✕', binanceSymbol: 'XRPUSDT' },
];

// Fallback rates in case API fails
const fallbackRates = {
    'BTC': 43000.00,
    'ETH': 2600.00,
    'USDT': 1.00,
    'LTC': 65.00,
    'SOL': 95.00,
    'BNB': 320.00,
    'ADA': 0.48,
    'XRP': 0.55,
};

// Cache for API rates
let cryptoRatesCache = { ...fallbackRates };
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 seconds

// Fetch real-time prices from Binance API
export const fetchCryptoRates = async () => {
    const now = Date.now();
    
    // Return cached rates if they're still valid
    if (now - lastFetchTime < CACHE_DURATION && Object.keys(cryptoRatesCache).length > 0) {
        return cryptoRatesCache;
    }

    try {
        // Get all unique Binance symbols
        const symbols = [...new Set(cryptoOptions.map(crypto => crypto.binanceSymbol))];
        
        // Fetch prices from Binance API
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price`);
        const data = await response.json();
        
        // Process the data
        const newRates = { ...fallbackRates };
        
        data.forEach(item => {
            const crypto = cryptoOptions.find(c => c.binanceSymbol === item.symbol);
            if (crypto) {
                newRates[crypto.symbol] = parseFloat(item.price);
            }
        });
        
        // Update cache
        cryptoRatesCache = newRates;
        lastFetchTime = now;
        
        console.log('Updated crypto rates from Binance:', newRates);
        return newRates;
        
    } catch (error) {
        console.error('Failed to fetch crypto rates from Binance:', error);
        // Return cached rates or fallback if available
        return Object.keys(cryptoRatesCache).length > 0 ? cryptoRatesCache : fallbackRates;
    }
};

// Get current crypto rates (with caching)
export const getCryptoRates = () => {
    return cryptoRatesCache;
};

// Helper function for accurate USD to crypto conversion
export const convertUSDToCrypto = (usdAmount, cryptoSymbol) => {
    const rates = getCryptoRates();
    const rate = rates[cryptoSymbol];
    if (!rate || rate <= 0) return 0;
    return usdAmount / rate;
};

// Helper function for crypto to USD conversion
export const convertCryptoToUSD = (cryptoAmount, cryptoSymbol) => {
    const rates = getCryptoRates();
    const rate = rates[cryptoSymbol];
    if (!rate || rate <= 0) return 0;
    return cryptoAmount * rate;
};

// Validation function to ensure conversion accuracy
export const validateConversion = (usdAmount, cryptoSymbol) => {
    const cryptoAmount = convertUSDToCrypto(usdAmount, cryptoSymbol);
    const backToUSD = convertCryptoToUSD(cryptoAmount, cryptoSymbol);
    const difference = Math.abs(usdAmount - backToUSD);
    const accuracy = ((usdAmount - difference) / usdAmount) * 100;
    
    return {
        originalUSD: usdAmount,
        cryptoAmount: cryptoAmount,
        convertedBackUSD: backToUSD,
        difference: difference,
        accuracy: accuracy,
        isValid: difference < 0.01 // Allow for small floating point errors
    };
};

// Calculate crypto amount with 2% fee
export const calculateCryptoWithFee = (usdAmount, cryptoSymbol) => {
    const baseCryptoAmount = convertUSDToCrypto(usdAmount, cryptoSymbol);
    const feeAmount = baseCryptoAmount * 0.02; // 2% fee
    const totalCryptoAmount = baseCryptoAmount + feeAmount;
    
    return {
        baseAmount: baseCryptoAmount,
        feeAmount: feeAmount,
        totalAmount: totalCryptoAmount,
        feePercentage: 2
    };
};

// Coupon codes system
export const couponCodes = {
    'WELCOME10': { discount: 10, description: 'Welcome discount' },
    'SAVE10': { discount: 10, description: 'Save 10%' },
    'CYBER20': { discount: 20, description: 'Cyber discount' },
    'VIP15': { discount: 15, description: 'VIP discount' },
    'NEWUSER': { discount: 10, description: 'New user discount' }
};

// Validate coupon code
export const validateCoupon = (code) => {
    const upperCode = code.toUpperCase();
    return couponCodes[upperCode] || null;
};

// Calculate price with coupon discount
export const calculatePriceWithCoupon = (originalPrice, couponCode) => {
    const coupon = validateCoupon(couponCode);
    if (!coupon) return { originalPrice, discountedPrice: originalPrice, discount: 0, coupon: null };
    
    const discountAmount = (originalPrice * coupon.discount) / 100;
    const discountedPrice = originalPrice - discountAmount;
    
    return {
        originalPrice,
        discountedPrice,
        discount: coupon.discount,
        discountAmount,
        coupon: coupon
    };
};

// Initialize rates on module load
fetchCryptoRates();

// Custom hook for React components to use crypto rates
export const useCryptoRates = () => {
    const [rates, setRates] = React.useState(getCryptoRates());
    const [isLoading, setIsLoading] = React.useState(false);
    const [lastUpdated, setLastUpdated] = React.useState(Date.now());

    const refreshRates = React.useCallback(async () => {
        setIsLoading(true);
        try {
            const newRates = await fetchCryptoRates();
            setRates(newRates);
            setLastUpdated(Date.now());
        } catch (error) {
            console.error('Failed to refresh rates:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    React.useEffect(() => {
        // Initial load
        refreshRates();

        // Refresh every 30 seconds
        const interval = setInterval(refreshRates, 30000);
        return () => clearInterval(interval);
    }, [refreshRates]);

    return {
        rates,
        isLoading,
        lastUpdated,
        refreshRates
    };
};