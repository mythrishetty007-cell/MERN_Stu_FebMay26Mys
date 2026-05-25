// Async form  submission
import {useState} from "react";

const initialFormData = {
    title: "",
    description: "",
};

export function AsyncForm(){
    // Store current form values
    const [formData, setFormData] = useState(initialFormData);

    // Stores validation error messages
    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(false);

    // Stores validation success messages
    const [successMessage, setSuccessMessage] = useState("");

    function handleChange(event){
        const {name, value} = event.target;

        setFormData((prevFormData)=> ({
            ...prevFormData,
            [name] : value,
        }));
    }

    const isFormValid =
    formData.title.trim()!=="" &&
    formData.description.trim()!=="";

    // Submit handler
    async function handleSubmit(event){
        event.preventDefault();

        if(!isFormValid){
            setErrorMessage("Please fill all fields");
            setSuccessMessage("");
            return;
        }
        setLoading(true);
        setSuccessMessage(""); 
        setErrorMessage("");

        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/posts",{
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({
                    title: formData.title,
                    body: formData.description,
                }),
            });

            if(!response.ok){
                throw new Error("Submission Failed");
            }
        
            const result = await response.json();
            console.log("Server response", result);
            setSuccessMessage("Form submitted successfully");
            setErrorMessage("");
            setFormData(initialFormData);
        }
        catch(error){
            console.error(error);
            setErrorMessage("Api submission failed");
            setSuccessMessage("");
        }
        finally{
            setLoading(false);
        }
    }

     return(
        <section>
            <h2>Async Form Validation Example</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="title" id="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter title" 
                    />
                </div>
                <br />
                <div>
                    <textarea name="description" id="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description" 
                    />
                </div>
                <br />

                <button type="submit" disabled={!isFormValid || loading}>
                    {loading?"Submitting form" : "Submit Form"}</button>

                <br />
                {successMessage && <p>{successMessage}</p>}    
                {errorMessage && <p>{errorMessage}</p>}
            </form>
        </section>
    )
}