import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateQuestion = () => {
    const [imageSelected, setImageselected] = useState("");
    const [dataGrammar, setDataGrammar] = useState([]);
    const [valueSelect, setValueSelect] = useState({});
    const [explain, setExplain] = useState("");
    const [level, setLevel] = useState(5);
    const [lession, setLession] = useState(1);
    const [valueAnswer, setValueAnswer] = useState(0);
    const createQuestion = () => {
        const objIndex = dataGrammar.findIndex(e => e.grammar === valueSelect);
        const formData = new FormData();
        console.log('IMAGE SELECTED LA ', imageSelected);
        formData.append("file", imageSelected);
        formData.append("upload_preset", "kbihuaf8");
        axios.post("https://api.cloudinary.com/v1_1/languageword/image/upload", formData).then((response) => {
            console.log(response);
            console.log(response.data.url);
            axios.post('http://192.168.1.72:3002/language/readImage1', {
                "urlImage": response.data.url,
                "explain": explain,
                "answer": valueAnswer,
                "level": level,
                "lession": lession,
                "data": dataGrammar[objIndex],
            }, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    console.log('CREATE QUESTION ', response.data);
                    console.log(response.data.code);
                })
                .catch(function (error) {
                    throw error;
                })
        })
    };
    useEffect(() => {
        axios.post('http://192.168.1.72:3002/language/getNameGrammar', {
            "level": level,
    },{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log('data daynhe',response.data);
                setDataGrammar(response.data.concat({}));
            })
            .catch(function (error) {
                throw error;
            })
    }, []);
    const handleChange = e => setValueSelect(e.target.value);
    const handleChangeAnswer = e => setValueAnswer(e.target.value);
    const handleChangeLevel = e => setLevel(e.target.value);
    const handleChangeInput = (event) => {
        setExplain(event.target.value);
    }
    const handleChangeLesion = (event) => {
        setLession(event.target.value);
    }
    const testss = () =>{
        console.log('test');
    }
    const dataAnswer = [0, 1, 2, 3];
    const datalevel = [5, 4, 3, 2];
    return (
        <div className='container'>
            <div className='content'>
                <div className='app-wrapper'>
                    <div>
                        <h2 className="title">Create Question</h2>
                    </div>
                    <div className="col space">
                        <b className="label">Upload file</b>
                        <input className='uploadfile' type="file" onChange={(event) => setImageselected(event.target.files[0])}></input><br></br>
                    </div>

                    <div className="email">
                        <b className="label">Explain</b>
                        <input
                            className="input"
                            type="text"
                            name="explain"
                            value={explain}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="col">
                        <b className="label">Answer</b>
                        <select className='lang1' value={valueAnswer} onChange={handleChangeAnswer}>{
                            dataAnswer.map((x, y) =>
                                <option key={y} value={x}>{x}</option>)
                        }</select>
                    </div>



                    <div className="email">
                        <b className="label">lession</b>
                        <input
                            className="input"
                            type={'text'}
                            name="lession"
                            value={lession}
                            onChange={handleChangeLesion}
                        />
                    </div>
                    <div className="col">
                        <b className="label">Level</b>
                        <select className='lang1' value={level} onChange={handleChangeLevel}>{
                            datalevel.map((x, y) =>
                                <option key={y} value={x}>{x}</option>)
                        }</select>
                    </div>

                    <div>
                    <h2>Choose grammar</h2>
                    <select value={valueSelect} onChange={handleChange}>{
                        dataGrammar.map((x, y) =>
                            <option key={y} value={x.grammar}>{x.grammar}</option>)
                    }</select>
                </div>

                    <div className='title'>
                        <button onClick={createQuestion} type="button" class="btn btn-primary">Create Word</button>
                    </div>
                </div>



            </div>
        </div>
        // <div style={{padding: "20px" }}>
        //     <h1>Upload file</h1>
        //     <div style={{ marginTop: "20px" }}>
        //         <input type="file" onChange={(event) => setImageselected(event.target.files[0])}></input><br></br>
        //         {/* <button onClick={uploadImage} style={{ marginTop: "20px" }} >Upload file</button> */}
        //     </div>
        // <div>
        //     <h2>Choose grammar</h2>
        //     <select value={valueSelect} onChange={handleChange}>{
        //         dataGrammar.map((x, y) =>
        //             <option key={y} value={x._id}>{x.grammar}</option>)
        //     }</select>
        // </div>
        //     <div>
        //         <h2>Explain</h2>
        //         <input
        //             className="input"
        //             type="text"
        //             name="explain"
        //             value={explain}
        //             onChange={handleChangeInput}
        //         />
        //     </div>
        //     <div>
        //         <h2>Answer</h2>
        //         <select value={valueAnswer} onChange={handleChangeAnswer}>{
        //             dataAnswer.map((x, y) =>
        //                 <option key={y} value={x}>{x}</option>)
        //         }</select>
        //     </div>
        //     <button onClick={tryTest}>try</button>

        //     <button onClick={createQuestion} style={{ padding: "5px", marginTop: "20px", backgroundColor: "#666666", color: '#fff'}}>createQuestion</button>
        // </div>
    )
}

export default CreateQuestion;