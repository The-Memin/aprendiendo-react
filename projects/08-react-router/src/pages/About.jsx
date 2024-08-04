import { Link } from "../Link"

const i18n = {
    es:{
        title: 'Sobre mi',
        button: 'Ir a la home',
        description: '¡Hola! Me llamo Guillermo y estoy creando un clon de React router'
    },
    en:{
        title: 'About me',
        button: 'Go to home page',
        description: 'Hi! My name is Guillermo and I am creating a clone of React Router'
    }
}

const useI18n = (lang) => {
    return i18n[lang] || i18n.en
}

export default function AboutPage({routeParams}){
    const i18n = useI18n(routeParams.lang ?? 'es')

    return(
        <>
            <h1>{i18n.title}</h1>
            <img src="https://avatars.githubusercontent.com/u/61178024?v=4" alt="" />
            <p>{i18n.description}</p>
            <Link to='/'>{i18n.button}</Link>
        </>
    )
}