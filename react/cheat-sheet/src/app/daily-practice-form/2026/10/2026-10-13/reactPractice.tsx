"use client";

import React, { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface errorStateData {
    name: string[];
    email: string[];
    password: string[];
    confirmPassword: string[];
    valid: boolean;
}

const defaultForm: SignupFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignupForm = () => {
    const [formData, setFormData] = useState<SignupFormData>(defaultForm);
    const [errorState, setErrorState] = useState<errorStateData>({
        name: [],
        email: [],
        password: [],
        confirmPassword: [],
        valid: true,
    });

    const handleFormFieldChange = (
        field: "name" | "email" | "password" | "confirmPassword",
        value: string,
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        handleFormValidation();
    };

    const handleFormValidation = () => {
        const tempErrorState: errorStateData = {
            name: [],
            email: [],
            password: [],
            confirmPassword: [],
            valid: true,
        };

        for (const field of Object.keys(formData) as Array<
            keyof SignupFormData
        >) {
            if (formData[field] === "") {
                tempErrorState[field].push("This field is required");
                tempErrorState.valid = false;
            }
        }

        if (
            formData.email !== "" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            tempErrorState.email.push("Invalid email format");
            tempErrorState.valid = false;
        }

        if (formData.password.length < 8) {
            tempErrorState.password.push(
                "Password must be at least 8 characters long",
            );
            tempErrorState.valid = false;
        }

        if (formData.confirmPassword !== formData.password) {
            tempErrorState.confirmPassword.push("Passwords do not match");
            tempErrorState.valid = false;
        }

        setErrorState(tempErrorState);
    };

    const handleSubmit = () => {
        if (errorState.valid) {
            console.log("Yay!");
            clearForm();
        } else {
            console.log("Invalid Form");
        }
    };

    const clearForm = () => {
        setFormData(defaultForm);
    };

    return (
        <div>
            <div>Signup Form</div>
            <div>
                <label>
                    Name:{" "}
                    <input
                        onChange={(e) =>
                            handleFormFieldChange("name", e.target.value)
                        }
                    />
                </label>
                {errorState.name.map((error, index) => (
                    <p key={index}>{error}</p>
                ))}
            </div>
            <div>
                <label>
                    Email:{" "}
                    <input
                        onChange={(e) =>
                            handleFormFieldChange("email", e.target.value)
                        }
                    />
                </label>
                {errorState.email.map((error, index) => (
                    <p key={index}>{error}</p>
                ))}
            </div>
            <div>
                <label>
                    Password:{" "}
                    <input
                        onChange={(e) =>
                            handleFormFieldChange("password", e.target.value)
                        }
                    />
                </label>
                {errorState.password.map((error, index) => (
                    <p key={index}>{error}</p>
                ))}
            </div>
            <div>
                <label>
                    Confirm Password:{" "}
                    <input
                        onChange={(e) =>
                            handleFormFieldChange(
                                "confirmPassword",
                                e.target.value,
                            )
                        }
                    />
                </label>
                {errorState.confirmPassword.map((error, index) => (
                    <p key={index}>{error}</p>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default SignupForm;
