// Pagina donde los administradores podras
// manejar todas las cuentas

import AdminSidebar from "../../components/admin/AdminSidebar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../styles.css";
import Filter from "../../components/Filter";
import SortFilter from "../../components/SortFilter";
import Search from "../../components/Search";
import Button from "../../components/Button";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllUsersProvider, { useAllUsers } from "../../context/AllUsersContext";

export default function AdminAccounts() {
    return (
        <AllUsersProvider>
            <AdminAccountsList />    
        </AllUsersProvider>
    )
}



function AdminAccountsList(){
    const { allUsers } = useAllUsers();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [status, setStatus] = useState(0);
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    // Contiene las salas filtradas
    const usersFiltered = useMemo(() => {
        const filtered = allUsers.filter(user => 
            (user.status == status || status == 0) &&
            (user.role == role || role == "") 
        )

        return filtered.filter(user => 
                    user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase()) ||
                    user.role.toLowerCase().includes(search.toLowerCase()) 
                ).sort((a,b) => {
                    if (sort == "asc") return a.firstName.localeCompare(b.firstName)
                    else if (sort == "desc") return  b.firstName.localeCompare(a.firstName)
                        else null
                })

    }, [sort, search, status, role])

    return (
        <>
            <Header />
            <main className="profile-page">
                <AdminSidebar />
                <div className="profile-info admin-pages">
                    <h1>Accounts</h1>

                    {/* Filtros */}
                    <Search search={search}  onChange={setSearch}/>

                    <div id="history-tool-bar">
                        <div className="filters">
                            <Filter heading="Status" value={status} setValue={setStatus}>
                                <option value={0}>All</option>
                                <option value={2}>Active</option>
                                <option value={1}>Inactive</option>
                            </Filter>

                            <Filter heading="Role" value={role} setValue={setRole}>
                                <option value={""}>All</option>
                                <option value={"Administrator"}>Administrator</option>
                                <option value={"Customer"}>Customer</option>
                            </Filter>
                    
                            <SortFilter sort={sort} setSort={setSort}/>    
                        </div>
                    
                        <Button text={"+"} classButtonName="btn-add" onClick={() => {navigate("manage")}}/>
                    </div>   

                    <table className="table-list">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            usersFiltered?.length > 0 ?
                                usersFiltered?.map((user, key) => 
                                    <tr className="select-table-row"
                                        key={key} 
                                        onClick={() => navigate(`manage/${user.id}`)}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{(user.status == 1) ? "Inactive" : "Active"}</td>
                                    </tr>
                                )
                            : <tr><td className="not-available-table-message" colSpan={4}>Rooms not available</td></tr>
                        }
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </>
    )
}