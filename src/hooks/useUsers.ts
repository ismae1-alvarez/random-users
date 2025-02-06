import { useEffect, useState } from "react";
import { Result } from "../interfaces/Users";

export default function useUsers() {
    const [users, setUsers] = useState<Result[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<Result[]>([]);

    // color 
    const [isColored, setIsColored] = useState<boolean>(false);

    // pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [userPerPage, setuserPerPage] = useState<number>(10);




    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch(import.meta.env.PUBLIC_URL);

            const { results }: { results: Result[] } = await response.json();

            setUsers(results);
            setFilteredUsers(results); 
         
        }

        fetchUsers();
    }, []);


    // Función para ordenar por país
    const ordenarPorPais = () => {
        const sortedUsers = [...filteredUsers].sort((a, b) =>
            a.location.country.localeCompare(b.location.country)
        );
        setFilteredUsers(sortedUsers);
    };

    // Funcion ResetArray
    const resetUsers = () =>{
        setFilteredUsers(users);
        setCurrentPage(1);
    }

    // Función para filtrar por país
    const filtrarPorPais = (pais: string) => {
        const filtered = users.filter((user) =>
            user.location.country.toLowerCase().includes(pais.toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    };

    // Funcion cambiar por colore pares
    const colorearFilas = () => {
        setIsColored(!isColored);
    };
    


    // Delete user
    const deleteUser = (email: string) => {
        const updatedUsers = users.filter((user) => user.email !== email);
        setUsers(updatedUsers)
        setFilteredUsers(updatedUsers);
    };



    // Calcular los usuarios  de la pagina actual
    const indexOfLastUser =  currentPage * userPerPage;
    const indexOfFirstUser =  indexOfLastUser - userPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

    // cambia la paginacions 
    const nextPage= ()=>{
        if( currentPage < Math.ceil(filteredUsers.length /  userPerPage)){
            setCurrentPage( currentPage + 1)
        }
    };

    const prevPage = () =>{
        if (currentPage > 1){
            setCurrentPage( currentPage - 1);
        };
    };



    return {
        users: currentUsers, 
        ordenarPorPais,
        resetUsers,
        filtrarPorPais,
        // page 
        nextPage,
        prevPage,
        currentPage,
        totalPages: Math.ceil(filteredUsers.length / userPerPage),
        deleteUser,
        isColored,
        colorearFilas
    };
}