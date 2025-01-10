import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);

    const navigate = useNavigate();

    const LoadDetails = (id) => {
        navigate('/employee/details/' + id);
    }

    const RemoveDetails = (id) => {
        if (window.confirm("Do you want to remove?")) {
            fetch("http://localhost:8000/employee/" + id, {
                method: 'DELETE'
            }).then((res) => {
                console.log(empdata)
                alert('Removed successfully');
                window.location.reload();
            }).catch((err) => {
                console.log(err.message);
            });
        }
    }

    const EditFunction = (id) => {
        navigate('/employee/edit/' + id);
    }

    useEffect(() => {
        fetch("http://localhost:8000/employee").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="btndiv">
                        <Link to="employee/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <a className="btn btn-success" onClick={() => { EditFunction(item.id) }}>Edit</a>
                                            <a className="btn btn-danger" onClick={() => { RemoveDetails(item.id) }}>Remove</a>
                                            <a className="btn btn-primary" onClick={() => { LoadDetails(item.id) }}>Details</a>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    );
}

export default EmpListing;