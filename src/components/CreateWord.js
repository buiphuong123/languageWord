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
    const handleForm = (event) => {
        event.preventDefault();
        console.log(values);
        axios.post("https://language-backend.vercel.app/createWord", {
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
        }, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                console.log(response.data.message);
                setValues({hira: "",
                kanji: "",
                vn: "",
                amhan: "",
                kata: "",
                level: "",
                type: "",
                typeWord: "",
                verbGround: "",
                typeVerb: "",
                typeAdj: "", alert: response.data.message});
            })
            .catch((error) => { console.log('https://language-backend.vercel.app/createWord', JSON.stringify(error)) });

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
                    <form className="form-wrapper" action="" onSubmit={handleForm}>
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
                        <div className="password">
                            <label className="label">level</label>
                            <select id="lang" name="level" onChange={handleChange} value={values.level}>
                                <option value=""></option>
                                <option value="5">N5</option>
                                <option value="4">N4</option>
                                <option value="3">N3</option>
                                <option value="2">N2</option>
                            </select>
                        </div>
                        <div className="password">
                        <label className="label">Type</label>
                        <select id="lang" name="type" onChange={handleChange} value={values.type}>
                            <option value=""></option>
                            <option value="1">only hira</option>
                            <option value="2">hira and kanji</option>
                            <option value="3">only kata</option>
                        </select>
                        </div>

                        <div className="password">
                        <label className="label">TypeWord</label>
                        <select id="lang" name="typeWord" onChange={handleChange} value={values.typeWord}>
                        <option value=""></option>
                            <option value="N">N</option>
                            <option value="V">V</option>
                            <option value="ADJ">ADJ</option>
                            <option value="ADV">ADV</option>
                        </select>
                        </div>

                        <div className="password">
                        <label className="label">verbGround</label>
                        <select id="lang" name="verbGround" onChange={handleChange} value={values.verbGround}>
                        <option value=""></option>
                            <option value="1"> động từ nhóm 1</option>
                            <option value="2">động từ nhóm 2</option>
                            <option value="3">động từ nhóm 3</option>
                        </select>
                        </div>

                        <div className="password">
                        <label className="label">typeVerb</label>
                        <select id="lang" name="typeVerb" onChange={handleChange} value={values.typeVerb}>
                        <option value=""></option>
                            <option value="1">Tự động từ</option>
                            <option value="2">Tha động từ</option>
                        </select>
                        </div>

                        <div className="password">
                        <label className="label">typeAdj</label>
                        <select id="lang" onChange={handleChange} value={values.typeAdj}>
                        <option value=""></option>
                            <option value="1">tính từ đuôi い</option>
                            <option value="2">tính từ đuôi な</option>
                        </select>
                        </div>
                        <div>
                            <button className="submit" type="submit">
                                Create Word
                            </button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    )
}
export default CreateWord;