import styles from "./styles/style2.lazy.scss"

styles.use()

const rootElement = document.getElementById("root")
rootElement.innerText="how are you doing"
rootElement.classList.toggle(styles.locals.component,true)
