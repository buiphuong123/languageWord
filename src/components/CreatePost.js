import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

function CreatePost() {
    const [data, setData] = useState('');
    const handleChange = (e, editor) => {
        console.log(e);
        setData(editor.getData());
    }
    // const sendRequest = () => {
    //     const formData = new FormData();
    //     // formData.append("file", imageSelected);
    //     formData.append("upload_preset", "kbihuaf8");
    // }
    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();

                    loader.file.then((file) => {
                        formData.append("file", file);
                        formData.append("upload_preset", "kbihuaf8");
                        axios.post("https://api.cloudinary.com/v1_1/languageword/image/upload", formData).then((res) => {
                            // console.log(response);
                            resolve({ default: res.data.url })
                            // console.log(response.data.url);
                        })
                        .catch((err) => {
                            reject(err);
                        })
                    })
                   
                })
            }
        }
    }

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        }
    }

    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                onInit={editor => {
                }}
                // config = {
                //     {
                // //        // plugins: [ Essentials ],
                // //       ckfinder: {
                // //           // The URL that the images are uploaded to.
                // //           uploadUrl: 'https://api.cloudinary.com/v1_1/languageword/image/upload', 

                // //           // Enable the XMLHttpRequest.withCredentials property.
                // //           withCredentials: true,

                // //           // Headers sent along with the XMLHttpRequest to the upload server.
                // //           headers: {
                // //               'X-CSRF-TOKEN': 'CSFR-Token',
                // //                Authorization: 'Bearer <JSON Web Token>'
                // //           }
                //     // }
                //  }

                //  }
                config={{
                    extraPlugins: [uploadPlugin]
                }}

                onChange={(e, editor) => { handleChange(e, editor) }}
            />
            <div>
                <p>{data}</p>
            </div>
        </div>
    )
}

export default CreatePost;