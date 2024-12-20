import { useEffect, useState } from "react";
import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEstaCarregando] = useState(true);

    useEffect(() => {
        setEstaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao buscar repositórios");
                }
                return res.json();
            })
            .then(resJson => {
                setTimeout(() => {
                    setEstaCarregando(false);
                    setRepos(resJson);
                }, 2000);
            })
            .catch(err => {
                console.error(err);
                setEstaCarregando(false);
            });
    }, [nomeUsuario]);

    return (
        <div className={styles.container}>
            {estaCarregando ? (
                <h1>Carregando...</h1>
            ) : repos.length > 0 ?  (
                <ul className={styles.list}>
                    {repos.map(repositorio => (
                        <li className={styles.listItem} key={repositorio.id}>
                            <div className={styles.listItemName}>
                                <b>Nome:</b> {repositorio.name}
                            </div>
                            <div className={styles.listItemLanguage}>
                                <b>Linguagem:</b> {repositorio.language || "N/A"}
                            </div>
                            <a
                                id="link"
                                className={styles.listItemLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                href={repositorio.html_url}
                            >
                                Visitar no Github
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <h2>Este usuário não possui repositórios.</h2>
            )}
        </div>
    );
};

export default ReposList;