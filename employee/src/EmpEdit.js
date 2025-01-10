import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EmpEdit = () => {
    const {empid}=useParams();
    // const [empdata, empdatachange] = useState({});
    useEffect(() => {
        fetch("http://localhost:8000/employee/"+empid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchanges(resp.id);
            namechanges(resp.name);
            emailchanges(resp.email);
            phonechanges(resp.phone);
            activechanges(resp.isactive)
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const [id, idchanges] = useState("");
    const [name, namechanges] = useState("");
    const [email, emailchanges] = useState("");
    const [phone, phonechanges] = useState("");
    const [active, activechanges] = useState(true);
    const [validation, valchange] = useState(false);

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = {id, name, email, phone, active };

        fetch("http://localhost:8000/employee/"+empid, {
            method: 'PUT',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        }).then((res) => {
            console.log(empdata)
            alert('Saved successfully');
            navigate('/');
        }).catch((err) => {
            console.log(err.message);
        });
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card" style={{ "textAlign": "center" }}>
                            <div className="card-title">
                                <h2>Employee Edit</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="btndiv">ID</label>
                                            <input className="form-control" value={id} disabled="disabled"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="btndiv">Name</label>
                                            <input className="form-control" value={name} 
                                            onMouseDown={e => valchange(true)}
                                            onChange={e => namechanges(e.target.value)}></input>
                                            {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="btndiv">Email</label>
                                        <input className="form-control" value={email} onChange={e => emailchanges(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="btndiv">Phone</label>
                                        <input className="form-control" value={phone} onChange={e => phonechanges(e.target.value)}></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-check">
                                        <input checked={active} type="checkbox" className="form-check-input" onChange={e => activechanges(e.target.value)}></input>
                                        <label className="form-check-lable btndiv">Is Active</label>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success">Save</button>
                                        <Link to="/" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    )
}
export default EmpEdit;