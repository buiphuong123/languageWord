import React, { useState } from 'react';
import axios from 'axios';

const CreateWord = () => {

    const [values, setValues] = useState({
        hira: "",
        kanji: "",
        vn: "",
        amhan: "",
        kata: "",
        level: "",
        type: "",
        typeWord: "",
        verbGround: "",
        typeVerb: "",
        typeAdj: "",
        alert: "",

    });
    const [vn, setExVn] = useState("");
    const [jp, setExJp] = useState("");
    const [examples, setExamples] = useState([]);
    const submitWord = () => {
        // event.preventDefault();
        console.log(values);
        console.log('example day nhe', examples);

        axios.post("http://192.168.1.4:3002/language/createWord", {
            "hira": values.hira,
            "kanji": values.kanji,
            "vn": values.vn,
            "amhan": values.amhan,
            "kata": values.kata,
            "level": values.level,
            "type": values.type,
            "typeWord": values.typeWord,
            "verbGround": values.verbGround,
            "typeVerb": values.typeVerb,
            "typeAdj": values.typeAdj,
            "exampleWord": examples,
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                console.log(response.data.message);
                console.log('vao query word');
                setValues({
                    hira: "",
                    kanji: "",
                    vn: "",
                    amhan: "",
                    kata: "",
                    level: "",
                    type: "",
                    typeWord: "",
                    verbGround: "",
                    typeVerb: "",
                    typeAdj: "",
                });
                setExamples([]);
            })
            .catch((error) => { console.log('http://192.168.1.4:3002/language/createWord', JSON.stringify(error)) });

    };
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues({
            ...values,
            [name]: value
        })
        console.log(name + '=' + value);
    }

    // const handleChangeInputVn = (event) => {
    //     setExVn(event.target.value);
    // }

    // const handleChangeInputJp = (event) => {
    //     setExJp(event.target.value);
    // }


    // const handleChaneEx = (e, index) => {
    //     examples[index] = e.target.value;
    //     setExamples(examples);
    // }
    // const handleAdd = (index) => {
    //     if (exVn === '' || exJp === '') {
    //         return;
    //     }
    //     // examples[index].jp = exJp;
    //     // examples[index].vn = exVn;
    //     examples.push({ jp: exJp, vn: exVn });
    //     setExamples(examples);
    //     setExJp('');
    //     setExVn('');
    // }

    const handleRemove = (index) => {
        examples.splice(index, 1);
        setExamples([...examples]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const exampleee = { jp, vn };
        if (jp && vn) {
            setExamples((ls) => [...ls, exampleee]);
            setExJp("");
            setExVn("");
        }
        console.log(examples);
    }
    return (
        <div className="container">
            {!values.alert ? null :
                <div className="alert">
                    <p>{values.alert}</p>
                </div>
            }
            <div className="content">
                <div className="app-wrapper">
                    <div>
                        <h2 className="title">Words</h2>
                    </div>
                    <div className="contentinput">
                        <div className="descontent">
                            <div className="password">
                                <label className="label">hira</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="hira"
                                    value={values.hira}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="password">
                                <label className="label">kanji</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="kanji"
                                    value={values.kanji}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* </div> */}
                            {/* <div className="descontent"> */}
                            <div className="password">
                                <label className="label">vn</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="vn"
                                    value={values.vn}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="descontent">
                            <div className="email">
                                <label className="label">anham</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="amhan"
                                    value={values.amhan}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="email">
                                <label className="label">kata</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="kata"
                                    value={values.kata}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='row mx-auto my-2'>
                            <div className="col-4">
                                <label className="label">level</label>
                                <select id='lang' name="level" onChange={handleChange} value={values.level}>
                                    <option value=""></option>
                                    <option value="5">N5</option>
                                    <option value="4">N4</option>
                                    <option value="3">N3</option>
                                    <option value="2">N2</option>
                                </select>
                            </div>

                            <div className="col-4">
                                <label className="label">TypeWord</label>
                                <select id='lang' name="typeWord" onChange={handleChange} value={values.typeWord}>
                                    <option value=""></option>
                                    <option value="N">N</option>
                                    <option value="V">V</option>
                                    <option value="ADJ">ADJ</option>
                                    <option value="ADV">ADV</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <label className="label">verbGround</label>
                                <select id="lang" name="verbGround" onChange={handleChange} value={values.verbGround}>
                                    <option value=""></option>
                                    <option value="1"> động từ nhóm 1</option>
                                    <option value="2">động từ nhóm 2</option>
                                    <option value="3">động từ nhóm 3</option>
                                </select>
                            </div>
                        </div>

                        <div className='topstyle'>
                        <div className='row mt-10'>
                            <div className="col-4">
                                <label className="label">typeVerb</label>
                                <select id="lang" name="typeVerb" onChange={handleChange} value={values.typeVerb}>
                                    <option value=""></option>
                                    <option value="1">Tự động từ</option>
                                    <option value="2">Tha động từ</option>
                                </select>
                            </div>

                            <div className="col-4">
                                <label className="label">typeAdj</label>
                                <select id="lang" name="typeAdj" onChange={handleChange} value={values.typeAdj}>
                                    <option value=""></option>
                                    <option value="1">tính từ đuôi い</option>
                                    <option value="2">tính từ đuôi な</option>
                                </select>
                            </div>
                        </div>
                        </div>

                        <h5 className='mt-0'>Create example</h5>
                        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                            <div>
                            <label className="label">JP</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="jp"
                                    value={jp}
                                    onChange={(e) => setExJp(e.target.value)}
                                />
                            </div>
                            <div>
                            <label className="label">Nghia</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="vn"
                                    value={vn}
                                    onChange={(e) => setExVn(e.target.value)}
                                />
                            </div>
                            <button>Add</button>
                        </form>


                        {/* {
                            examples.map((example, index) => {
                                return (                               // return (
                                    <div key={index} style={{ marginBottom: 20 }}>
                                        <div>
                                            <p>Jp</p>
                                            <input
                                                className="input"
                                                type="text"
                                                name="exJp"
                                                value={example.jp}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div>
                                            <p>Nghia</p>
                                            <input
                                                className="input"
                                                type="text"
                                                name="exVn"
                                                value={example.vn}
                                                onChange={handleChange}
                                            />
                                            <button onClick={() => handleRemove(index)}>Remove</button>
                                            <button onClick={() => handleAdd(index)}>Add</button>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        } */}
                        {
                            examples.map((a, index) => {
                                return (
                                    <div key={index} style={{ marginBottom: 20 }}>
                                        <p>{index + 1}. {a.jp}</p>
                                        <p>{a.vn}</p>
                                        <button onClick={() => handleRemove(index)}>Delete</button>
                                    </div>
                                )
                            })
                        }
                        {/* <button onClick={(e) => addExample(e)}>
                            Them
                        </button> */}
                        <div className='title'>
                            <button onClick={() => submitWord() } type="button" className="btn btn-primary">Create Word</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default CreateWord;