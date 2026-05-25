import { useState } from "react";

// Validation & error messages
// Initial form values
const initialFormData = {
    email: "",
    password: "",
};

export function ValidationForm() {
    // Store current form values
    const [formData, setFormData] = useState(initialFormData);

    // Stores validation error messages
    const [errors, setErrors] = useState({});

    // Track of whether a field has been visited 
    const [touched, setTouched] = useState({});

    // Track of whether a field has been modified
    const [dirty, setDirty] = useState({});

    function validate(values){
        const newErrors = {};

        // Email validation
        if(!values.email.trim()){
            newErrors.email = "Email is required";
        }
        else if(!/\S+@\S+\.\S+/.test(values.email)){
            newErrors.email = "Please enter a valid email address";
        }

        // Password validation
        if(!values.password.trim()){
            newErrors.password = "Password is required";
        }
        else if(values.password.length < 6){
            newErrors.password = "Password must be at least 6 characters";
        }

        return newErrors;
    }

    function handleChange(event){
        const {name, value} = event.target;

        const updatedValues = {
            ...formData,
            [name] : value,
        };

        setFormData(updatedValues); //modify the state data
        setErrors(validate(updatedValues));

        setDirty((prevDirty)=> ({
            ...prevDirty,
            [name] : value !== initialFormData[name],
        }));
    }
    // Blur handler
    function handleBlur(event){
        const {name} = event.target;

        setTouched((prevTouched)=>({
            ...prevTouched,
            [name]:true,
        }));
    }

    // Submit handler
    function handleSubmit(event){
        event.preventDefault();

        const validationErrors = validate(formData);

        setErrors(validationErrors);

        setTouched({
            email:true,
            password:true,
        });

        if(Object.keys(validationErrors).length === 0){
            console.log("Form Submitted:",formData);
            alert("Form submitted successfully");

            setFormData(initialFormData);
            setErrors({});
            setTouched({});
            setDirty({});
        }
    }

    const isFormValid =
    formData.email.trim()!=="" &&
    formData.password.trim()!=="" &&
    Object.keys(validate(formData)).length === 0;

    return(
        <section>
            <h2>Form Validation Example</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email" name="email" id="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter email" 
                    />
                </div>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <br />
                <div>
                    <input type="password" name="password" id="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter password" 
                    />
                </div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <br />

                <button type="submit" disabled={!isFormValid}>Submit</button>
            </form>
        </section>
    )
}