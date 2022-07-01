import React, {useState} from 'react';

function AddExample() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email);
    }
    return (
    <div className='App'>
        <h1>React</h1>
        <form onSubmit={handleSubmit}>
        <input name='name' placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
        <input name='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button>Add</button>
        </form>
    </div>
    )
}

export default AddExample;