import { useState, useCallback, useMemo } from 'react';

export function useMonoWidget() {
	const [scriptLoaded, setScriptLoaded] = useState(false);
	const [authCode, setAuthCode] = useState('');

	const openMonoWidget = useCallback(async () => {
		const MonoConnect = (await import('@mono.co/connect.js')).default;

		const monoInstance = new MonoConnect({
			key: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY,
			onClose: () => console.log('Widget closed'),
			onLoad: () => setScriptLoaded(true),
			onEvent: (eventName: string) => {
				if (eventName === 'INSTITUTION_SELECTED') {
					// display toasts showing test otp and security answer
				}
			},
			onSuccess: ({ code }: { code: string }) => setAuthCode(code),
		});

		monoInstance.setup();
		monoInstance.open();
	}, []);

	return useMemo(() => ({ openMonoWidget, authCode, setAuthCode }), [authCode, openMonoWidget]);
}
