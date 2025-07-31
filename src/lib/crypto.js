export const cryptoOptions = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', network: 'Bitcoin', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', icon: '₿' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', network: 'ERC20', address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', icon: 'Ξ' },
    { id: 'usdt-erc20', name: 'USDT (ERC20)', symbol: 'USDT', network: 'Ethereum', address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', icon: '₮' },
    { id: 'usdt-trc20', name: 'USDT (TRC20)', symbol: 'USDT', network: 'Tron', address: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE', icon: '₮' },
    { id: 'ltc', name: 'Litecoin', symbol: 'LTC', network: 'Litecoin', address: 'ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', icon: 'Ł' },
    { id: 'sol', name: 'Solana', symbol: 'SOL', network: 'Solana', address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU', icon: '◎' },
    { id: 'usdt-bep20', name: 'USDT (BEP20)', symbol: 'USDT', network: 'BSC', address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', icon: '₮' },
    { id: 'bnb', name: 'BNB', symbol: 'BNB', network: 'BSC', address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6', icon: '⬡' },
    { id: 'ada', name: 'Cardano', symbol: 'ADA', network: 'Cardano', address: 'addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', icon: '₳' },
    { id: 'xrp', name: 'XRP', symbol: 'XRP', network: 'XRP Ledger', address: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH', icon: '✕' },
];

// In a real app, you would fetch these from an API like Binance.
// For now, these are placeholder values.
export const cryptoRates = {
    'BTC': 68000.00,
    'ETH': 3800.00,
    'USDT': 1.00,
    'LTC': 80.00,
    'SOL': 165.00,
    'BNB': 600.00,
    'ADA': 0.45,
    'XRP': 0.52,
};
