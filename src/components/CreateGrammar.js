import React, { useState } from 'react';
import axios from 'axios';

function CreateGrammar() {
    const [values, setValues] = useState({
        grammar: "",
        lession: "",
        level: "",
        translation: "",
        structure: "",
        indication: "",
        mean: "",
    });
    const [vn, setExVn] = useState("");
    const [jp, setExJp] = useState("");
    const [examples, setExamples] = useState([]);
    const [structures, setStructures] = useState([]);
    const [indications, setIndications] = useState([]);
    const [means, setMeans] = useState([]);

    const submitWord = () => {
        // event.preventDefault();
        axios.post("http://192.168.1.4:3002/language/createGrammar", {
            "grammar": values.grammar,
            "lession": values.lession,
            "level": values.level,
            "translation": values.translation,
            "structGrammar": structures,
            "indiGrammar": indications,
            "meanGrammar": means,
            "exampleGrammar": examples,
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                console.log(response.data.message);
                setValues({
                    grammar: "",
                    lession: "",
                    level: "",
                    translation: "",
                    structure: "",
                    indication: "",
                    mean: "",

                });
                setExamples([]);
                setIndications([]);
                setStructures([]);
                setMeans([]);
            })
            .catch((error) => { console.log(error) });

    };
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleRemoveStructures = (index) => {
        structures.splice(index, 1);
        setStructures([...structures]);
    }

    const handleSubmitStructures = (e) => {
        e.preventDefault();
        if (values.structure) {
            setStructures((ls) => [...ls, values.structure]);
            setValues({
                ...values,
                structure: ""
            })
        }
    }

    const handleRemoveIndications = (index) => {
        indications.splice(index, 1);
        setIndications([...indications]);
    }

    const handleSubmitIndications = (e) => {
        e.preventDefault();
        if (values.indication) {
            setIndications((ls) => [...ls, values.indication]);
            setValues({
                ...values,
                indication: ""
            })
        }
    }

    const handleRemoveMeans = (index) => {
        means.splice(index, 1);
        setMeans([...means]);
    }

    const handleSubmitMeans = (e) => {
        e.preventDefault();
        if (values.mean) {
            setMeans((ls) => [...ls, values.mean]);
            setValues({
                ...values,
                mean: ""
            })
        }
    }

    const handleRemoveExample = (index) => {
        examples.splice(index, 1);
        setExamples([...examples]);
    }

    const handleSubmitExample = (e) => {
        e.preventDefault();
        const exampleee = { jp, vn };
        if (jp && vn) {
            setExamples((ls) => [...ls, exampleee]);
            setExJp("");
            setExVn("");
        }
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
                        <h2 className="title">Grammars</h2>
                    </div>
                    <div className="contentinput">
                        <div className="row mt-10">
                            <div className="col-4">
                                <label className="label">grammar</label>
                                <input
                                    className="input"
                                    type="text"
                                    name="grammar"
                                    value={values.grammar}
                                    onChange={handleChange}
                                />
                            </div>

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
                                <label className="label">lession</label>
                                <input
                                    className="input"
                                    type="number"
                                    name="lession"
                                    value={values.lession}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                        <div>
                            <label className="label mt-3">translation</label>
                            <input
                                className="input"
                                type="text"
                                name="translation"
                                value={values.translation}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <h5 className='mt-0'>Create mean</h5>
                            <form onSubmit={handleSubmitMeans} style={{ marginBottom: 20 }}>
                                <div>
                                    <label className="label">Mean</label>
                                    <input
                                        className="input"
                                        type="text"
                                        name="mean"
                                        value={values.mean}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button>Add</button>
                            </form>
                        </div>

                        {
                            means.map((a, index) => {
                                return (
                                    <div key={index} className="row mx-auto" style={{ marginBottom: 20 }}>
                                        <div className="col-6"><p>{index + 1}. {a}</p></div>
                                        <div className="col-4"><button onClick={() => handleRemoveMeans(index)}>Delete</button></div>
                                    </div>
                                )
                            })
                        }
                        <div>
                            <h5 className='mt-0'>Create structure(loai tu dứng trước)</h5>
                            <form onSubmit={handleSubmitStructures} style={{ marginBottom: 20 }}>
                                <div>
                                    <label className="label">structure</label>
                                    <input
                                        className="input"
                                        type="text"
                                        name="structure"
                                        value={values.structure}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button>Add</button>
                            </form>
                        </div>
                        {
                            structures.map((a, index) => {
                                return (
                                    <div key={index} className="row mx-auto" style={{ marginBottom: 20 }}>
                                        <div className="col-6"> <p>{index + 1}. {a}</p></div>
                                        <div className="col-4"> <button onClick={() => handleRemoveStructures(index)}>Delete</button></div>
                                    </div>
                                )
                            })
                        }

                        <div>
                            <h5 className='mt-0'>Create indication</h5>
                            <form onSubmit={handleSubmitIndications} style={{ marginBottom: 20 }}>
                                <div>
                                    <label className="label">indication</label>
                                    <input
                                        className="input"
                                        type="text"
                                        name="indication"
                                        value={values.indication}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button>Add</button>
                            </form>
                        </div>
                        {
                            indications.map((a, index) => {
                                return (
                                    <div key={index} className="row mx-auto" style={{ marginBottom: 20 }}>
                                        <div className="col-6"><p>{index + 1}. {a}</p></div>
                                        <div className="col-4"><button onClick={() => handleRemoveIndications(index)}>Delete</button></div>
                                    </div>
                                )
                            })
                        }

                        <div>
                            <h5 className='mt-0'>Create example</h5>
                            <form onSubmit={handleSubmitExample} style={{ marginBottom: 20 }}>
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
                        </div>


                        {
                            examples.map((a, index) => {
                                return (
                                    <div key={index} style={{ marginBottom: 20 }}>
                                        <p>{index + 1}. {a.jp}</p>
                                        <p>{a.vn}</p>
                                        <button onClick={() => handleRemoveExample(index)}>Delete</button>
                                    </div>
                                )
                            })
                        }
                        {/* <button onClick={(e) => addExample(e)}>
                        Them
                    </button> */}
                        <div className='title'>
                            <button onClick={() => submitWord()} type="button" className="btn btn-primary">Create Word</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default CreateGrammar;