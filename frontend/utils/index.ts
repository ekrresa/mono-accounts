export function formatAmount(amount: number, decimals: number = 2) {
	return new Intl.NumberFormat('en-GB', { minimumFractionDigits: decimals }).format(amount);
}

export function getBankInitials(bankName: string) {
	return bankName.slice(0, 2).toUpperCase();
}

export function getGreeting() {
	const date = new Date().getHours();
	return date < 12 ? 'Good morning' : date < 17 ? 'Good afternoon' : 'Good evening';
}
