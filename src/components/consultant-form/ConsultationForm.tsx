import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./ConsultationForm.css";
import { useLocation } from "react-router-dom";

interface FormData {
  name: string;
  phone: string;
  age: string;
  city: string;
  company: string;
  complaints: string;
  physiotherapy_experience: boolean;
}

interface Doctor {
  id: string;
  name: string;
  expertise: string;
  city: string;
}

const initialDoctors: Doctor[] = [];

const ConsultationForm: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    age: "",
    city: "",
    company: "",
    complaints: "",
    physiotherapy_experience: false,
  });

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const cityParam = urlParams.get("city");
    if (cityParam) {
      setFormData((prevData) => ({ ...prevData, city: cityParam }));
    }
  }, [location.search]);

  // Handle form input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    handleCityClick(formData.city);
  }, [formData.city]);

  const handleCityClick = (cityValue: string) => {
    const fetchDoctorsByCity = async () => {
      try {
        if (!cityValue) {
          return;
        }

        const response = await fetch(
          `https://fix-health-7df63-default-rtdb.firebaseio.com/doctor.json?orderBy="city"&equalTo="${cityValue}"`
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();

        const doctorData = [];

        for (const key in responseData) {
          doctorData.push({
            id: key,
            name: responseData[key].name,
            expertise: responseData[key].expertise,
            city: responseData[key].city,
          });
        }

        setDoctors(doctorData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctorsByCity().catch((error) => {
      console.log(error);
    });
  };

  // Handle form submission ---> it will save all data in firebase
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(
      "https://fix-health-7df63-default-rtdb.firebaseio.com/health.json",
      {
        method: "POST",
        body: JSON.stringify({
          id: doctors[0].id,
          user: formData,
        }),
      }
    );
    setFormData({
      name: "",
      phone: "",
      age: "",
      city: "",
      company: "",
      complaints: "",
      physiotherapy_experience: false,
    });
    return window.confirm("Data saved successfully");
  };

  const cityOptions = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
  ];

  return (
    <div className="consultation-form">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            placeholder="Your Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City:
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            onClick={() => {
              console.log(formData.city);
              handleCityClick(formData.city);
            }}
          >
            <option value="" disabled>
              Select a city
            </option>
            {cityOptions.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>
        <label>
          Company:
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </label>

        <label>
          Chief Complaints:
          <textarea
            name="complaints"
            placeholder="describing the symptom, problem, condition, diagnosis, physician-recommended return, or other reason for a medical encounter."
            value={formData.complaints}
            onChange={handleChange}
            rows={4}
            required
          ></textarea>
        </label>

        {parseInt(formData.age) >= 40 && (
          <div className="checkbox-field">
            <label>Previous Experience with Physiotherapy: </label>
            <input
              type="checkbox"
              name="experience"
              checked={formData.physiotherapy_experience}
              onChange={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  physiotherapy_experience: !prevData.physiotherapy_experience,
                }))
              }
            />
          </div>
        )}
        {formData.city && (
          <div className="available-doctor">
            <h3>Best Available Doctors:</h3>
            <ul>
              {doctors.length > 0 ? (
                doctors.map((doctor, index) => (
                  <li key={index}>
                    {doctor.name} - {doctor.expertise} - {doctor.city}
                  </li>
                ))
              ) : (
                <p className="not-found">Not Avalaible</p>
              )}
            </ul>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ConsultationForm;
