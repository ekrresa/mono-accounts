import { useState, useCallback } from 'react';

export default function useMonoWidget() {
	const [scriptLoaded, setScriptLoaded] = useState(false);
	const [authCode, setAuthCode] = useState('');

	const openMonoWidget = useCallback(async () => {
		const MonoConnect = (await import('@mono.co/connect.js')).default;

		const monoInstance = new MonoConnect({
			key: process.env.NEXT_PUBLIC_MONO_PUBLIC_KEY,
			onClose: () => console.log('Widget closed'),
			onLoad: () => setScriptLoaded(true),
			onSuccess: ({ code }: { code: string }) => setAuthCode(code),
		});

		monoInstance.setup();
		monoInstance.open();
	}, []);

	return { openMonoWidget, authCode };
}
