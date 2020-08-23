import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }) => {

    return (
        <div>
            <Head>
                <meta charset='utf-8' />
                <meta http-equiv='X-UA-Compatible' content='IE=edge' />
                <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                <meta name='description' content='Full Stack Authentication In Next.js With GraphQL' />
                <meta name='keywords' content='Next.js, GraphQL, JWT, CRUD, JavaScript, React.js, MongoDB' />
                <title>Nextjs | Stories</title>
                <link rel="manifest" href="/manifest.json" />
                <link href='./icons/js.png' rel='icon' type='image/png' sizes='16x16' />
                <link href='./icons/js.png' rel='icon' type='image/png' sizes='32x32' />
                <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                <meta name="theme-color" content="#317EFB" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
            </Head>
            <Navbar />
            { children}
        </div>
    )
}

export default Layout
