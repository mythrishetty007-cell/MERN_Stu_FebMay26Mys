// Controlled & uncontrolled components
import { useRef, useState } from "react";
const initialFormData = {
    username: "",
    bio:"",
    country:"",
    gender:"",
    agree:false
};

export function ControlledForm() {
    const [formData, setFormData] = useState(initialFormData);

    // Uncontrolled file input
    const fileRef = useRef(null);

    function handleChange(event) {
        const {name,value,checked,type} = event.target;

        setFormData((prevFormData)=>({
            ...prevFormData,
            [name]:type==="checkbox"?checked:value,
        }));
    }
    // Form submit handler
    function handleSubmit(event) {
        event.preventDefault();

        const uploadedFile = fileRef.current?.files?.[0] || null;

        const submittedData = {
            ...formData,
            uploadedFileName: uploadedFile ? uploadedFile.name : "No file selected",
        };
        console.log("Submitted form data:",submittedData);
        alert("Form submitted successfully");
    }
    // reset form to initial state
    function handleReset() {
        setFormData(initialFormData);
        if (fileRef.current) {
            fileRef.current.value = "";
        }
    }

    return(
        <section>
            <h2>Controlled Components</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="username" id="username" 
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    /> <br />
                    <textarea name="bio" id="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Write a short bio"
                    /> <br />
                    <select name="country" id="country"
                    value={formData.country}
                    onChange={handleChange}>
                        <option value="">Select country</option>
                        <option value="India">India</option>
                        <option value="SouthAfrica">South Africa</option>
                    </select>
                    <br />
                    <fieldset>
                        <legend>Gender</legend>
                        <label htmlFor="male">
                        <input type="radio" name="gender" id="male" 
                        value="Male" checked={formData.gender === "Male"}
                        onChange={handleChange}/>
                        Male</label>
                        <label htmlFor="female">
                        <input type="radio" name="gender" id="female" 
                        value="Female" checked={formData.gender === "Female"}
                        onChange={handleChange}/>
                        Female</label>
                    </fieldset>
                    <br />
                    <label htmlFor="agree">
                        <input type="checkbox" name="agree" id="agree" 
                        checked={formData.agree}
                        onChange={handleChange}/>
                        Accept Terms</label>
                        <br />
                        <label htmlFor="resume">
                            Upload resume
                        </label>
                        <input type="file" id="resume" ref={fileRef} />
                        <br />
                        <button type="submit">Submit</button>
                        <button type="button" onClick={handleReset}>Reset</button>
                </div>
            </form>
            <hr />
            <h3>Live form data preview:</h3>
            <p>username: {formData.username || "Not Entered"}</p>
            <p>Bio: {formData.bio || "Not Entered"}</p>
            <p>Country: {formData.country || "Not Entered"}</p>
            <p>Gender: {formData.gender || "Not selected"}</p>
            <p>Accepted terms?: {formData.agree?"Yes":"No"}</p>
            <p>Selected file: {fileRef.current?.files?.[0]?.name || "No file selected"}</p>
        </section>
    );
}