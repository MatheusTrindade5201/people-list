# People List

Esse é um projeto CRUD desenvolvido com React.js e com Firebase para o serviço de autentificação, que tem como objetivo permitir que o usuário veja uma lista de pessoas, e tenha a opção de deletar, incluir ou editar alguém.
  
- [x] Visualizar lista.
- [x] Se autentificar via login ou se cadastrar.
- [x] Editar, deletar ou incluir alguém a lista.
- [x] Deslogar.
- [ ] Responsivo (Em desenvolvimento)


  - Link do Site-solução: [People List](https://people-list-henna.vercel.app/Edit/1) 

## Preview do produto final

![Captura de tela 2022-10-18 072253](https://user-images.githubusercontent.com/104238483/196406095-818f86c1-9da6-41f7-8c8c-a7e131c8cc8a.png)


### Lista de pessoas:

![Captura de tela 2022-10-18 072328](https://user-images.githubusercontent.com/104238483/196406116-f37822dd-17e1-4082-98de-e1153575ed1e.png)

### Opções de edição e inclusão: 

![Captura de tela 2022-10-18 072345](https://user-images.githubusercontent.com/104238483/196406252-0fa159ba-4098-40b7-976c-87865cd523f1.png)

![Captura de tela 2022-10-18 072917](https://user-images.githubusercontent.com/104238483/196406315-c76d0c68-4f59-4061-98dd-72cac73488d4.png)


## Detalhes do projeto: 

#### O projeto foi desenvolvido com react-router-dom para a roteirização das páginas

```
const RouterApp = () => {
    
        return (
            <BrowserRouter>
                <Routes>
                <Route element={<Login/>} path='/' exact/>
                <Route element={<Register />} path='/Register' />
                <Route element={<Home />} path='/Home' />
                <Route element={<Edit />} path='/Edit/:id' />
                <Route element={<Add />} path='/Add' />
                </Routes>
            </BrowserRouter>
        )
}
```

Acima temos o Route para o <Edit /> que recebe um path com o ID de forma dinâmica para abrir o usuário e exibir as informação do mesmo em especifico.

#### Para a autentificação, foi usado o firebase, junto cum a biblioteca firebase-hooks:

##### Configuração do firebase:

```
const AuthConfig = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});

export const auth = getAuth(AuthConfig)
```

##### Login:

```
const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const signIn = () => {
        signInWithEmailAndPassword(email, password)
    }
```

##### Cadastro:

```
const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const signUp = () => {
        createUserWithEmailAndPassword(email, password)
    }
```

#### Metodos para a lista: Utilizamos o Mocki API para o projeto, onde podemos fazer todos os tipos de requisições, neste projetos foi utilizado: DELETE, POST, PUT, GET.

Para as requisições HTTP, utilizamos o metodo fetch():

##### GET:

```
const addPeople = async () => {
        if(name.length > 2 && emailRegex.test(email) && birthRegex.test(birth)){
        setLoading(true)
        await fetch('https://63471b7bdb76843976a667ae.mockapi.io/peoples',{
            method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                birthDate: birth
            }) 
        })
        setAdded(true)    
    }else{
        alert("Dados invalidos!  \n Nome: Pelo menos 2 caracteres. \n Email: email@domain.com. \n Birth Date: dd/mm/yyyy")
    }
    }
```
Para adicionar uma pessoa, foi usado uma validação dos campos preenchidos.

##### POST:

```
const getPeople = async () => {
        try {
            const data = await fetch('https://63471b7bdb76843976a667ae.mockapi.io/peoples')
            const json = await data.json()
            setPeople(json)
            setLoading(false)
            console.log(json);
        } catch (error) {
            console.log(error.message);
        }
    }
```

##### PUT:

```
const editPeople = async () => {
        const data = {
            name: name,
            email: email,
            birthDate: birth
        }
        await fetch (`https://63471b7bdb76843976a667ae.mockapi.io/peoples/${id}`, {
            method:'PUT',
            headers: {
                'Content-type': 'application/json'
              },
            body: JSON.stringify({
                name: name,
                email: email,
                birthDate: birth
            })
        })
        .then(
            setEdited(true)
        )
    }
```

##### DELETE:

```
const deletePeople = async () =>{
        await fetch (`https://63471b7bdb76843976a667ae.mockapi.io/peoples/${id}`, {
            method:'DELETE'
        })
        .then(
            setDeleted(true)
        )
    }
```

#### Hooks

Para o controle de renderização da página e chamada da API, usamos os Hooks useState e useEffect. E Para trabalhar com a rota dinamica, utilizamos o useParams para captar o valor do id do objeto

#### Desenvolvimento 

Caso queira fazer o clone do repositório, por favor usar o comando abaixo para download das dependencias:
```
npm intall
```

Será necessário criar suas proprias chaves para o firebase para configuração.


