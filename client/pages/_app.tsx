import { AppProps } from "next/app";

declare global {
	interface Window {
		Kakao: any;
	}
}

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default App;
