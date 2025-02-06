import { ButtonWithCustomFunction } from "./components/Button";
import { ItemsUser } from "./components/ItemsUser";
import useUsers from "./hooks/useUsers";

const App = () => {
    const {
        users,
        ordenarPorPais,
        resetUsers,
        filtrarPorPais,
        nextPage,
        prevPage,
        currentPage,
        totalPages,
        deleteUser,
        isColored,
        colorearFilas
    } = useUsers();



    return (
        <>
            <h2 className="text-5xl font-bold text-center py-5">Lista de usuarios</h2>

            <section className="flex justify-between container w-full mx-auto py-5">
                <ButtonWithCustomFunction executeFunction={colorearFilas}>
                    Color filas
                </ButtonWithCustomFunction>
                <ButtonWithCustomFunction executeFunction={ordenarPorPais}>
                    Ordenar por país
                </ButtonWithCustomFunction>

                <ButtonWithCustomFunction executeFunction={resetUsers}>
                    Restaurar estado inicial
                </ButtonWithCustomFunction>

                <input
                    type="text"
                    placeholder="Filtrar por país"
                    onChange={(e) => filtrarPorPais(e.target.value)}
                />

                <h3 className="font-black text-xl">
                    Número de usuarios <span>{users.length}</span>
                </h3>
            </section>

            <table className="w-full items-center container mx-auto">
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Pais</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((item, index) => (
                        <ItemsUser key={item.phone} {...item} deleteUser={deleteUser} 
                        isColored={isColored} index={index}/>
                    ))}
                </tbody>
            </table>

            <div className=" mt-5 container w-full flex items-center gap-5 justify-center mx-auto">
                <button className={` py-2 rounded-md px-5 hover:cursor-pointer ${currentPage === 1 ? 'bg-gray-200' : 'bg-green-500'}`} onClick={prevPage} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span > Página {currentPage} de {totalPages} </span>
                <button className={` py-2 rounded-md px-5 hover:cursor-pointer ${currentPage === totalPages ?'bg-gray-200' : 'bg-green-500'}`} onClick={nextPage} disabled={currentPage === totalPages}>
                    Siguiente
                </button>
            </div>
        </>
    );
};

export default App;