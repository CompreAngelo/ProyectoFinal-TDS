import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import "../../Css/FotoMulta.css";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useAuth } from "../../context/provider.jsx";

function FotoMulta() {
  const [profileImage, setProfileImage] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);
  const [imageBase64usuario, setImageBase64usuario] = useState();
  const [imageBase64vehiculo, setImageBase64vehiculo] = useState();
  const [imagePreviewUrlProfile, setimagePreviewUrlProfile] = useState();
  const [imagePreviewUrlVehicle, setimagePreviewUrlVehicle] = useState();
  const { user } = useAuth(); // Importar el contexto de autenticación
  const [userID, setUserID] = useState("id no encontrado"); // Estado para almacenar el ID del usuario

  // Obtener el ID del usuario del contexto de autenticación
  useEffect(() => {
    if (user && user.user && user.user.nombre) {
      setUserID(user.user.id);
      setProfileImage(user.user.foto);
      setVehicleImage(user.user.foto_Vehiculo);
      console.log("fotos", user.user.foto_Vehiculo, user.user.foto);
    }
  }, [user]);

  const handleImageUploadfoto = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64usuario(reader.result);
        console.log(reader.result); // Imprime el resultado aquí
        setimagePreviewUrlProfile(reader.result);
        setProfileImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadfoto_Vehiculo = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64vehiculo(reader.result);
        console.log(reader.result); // Imprime el resultado aquí
        const image = event.target.files[0];
        const imageUrl = URL.createObjectURL(image);
        if(imageUrl){
          setimagePreviewUrlVehicle(imageUrl)
        }
        console.log(event.target.files[0]);
        setVehicleImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const profileInputRef = useRef(null);
  const vehicleInputRef = useRef(null);

  const handleProfileImageUploadClick = () => {
    profileInputRef.current.click();
  };

  const handleVehicleImageUploadClick = () => {
    vehicleInputRef.current.click();
  };

  const uploadAndStoreImage = async () => {
    try {

      console.log("Id:", userID)
      
      if (imagePreviewUrlProfile) {
      const response = await axios.post(
        `http://localhost:4000/userimage/${userID}`,
        {
          foto: imageBase64usuario,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

     

      console.log(response);
      if(response.status == 200){
        return
      }
      if (!response.status == 200) {
        throw new Error("Error al subir y almacenar la imagen del usuario");
      }
    }

    if(imagePreviewUrlVehicle) {
      const response = await axios.post(
        `http://localhost:4000/vehicleimage/${userID}`,
        {
          foto_Vehiculo: imageBase64vehiculo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if(response.status == 200){
        return
      }
      if (!response.status == 200) {
        throw new Error("Error al subir y almacenar la imagen del vehiculo");
      }
    }

    } catch (error) {
      console.error("Error en uploadAndStoreImage:", error);
    }
  };


  const handleUploadButtonClick = async () => {
    uploadAndStoreImage();
  };

  return (
    <div className="row">
      <div className="col-lg-12 mb-3">
        <div className="card">
          <div className="card-body text-center shadow">
            <div className="d-flex align-items-center justify-content-center flex-column">
              <label htmlFor="profileImage" className="form-label mb-2">
                <strong>Foto de Perfil</strong>
              </label>
              <div
                className="input-div"
                onClick={handleProfileImageUploadClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  fill="none"
                  stroke="green"
                  className="icon"
                >
                  <polyline points="16 16 12 12 8 16"></polyline>
                  <line y2="21" x2="12" y1="12" x1="12"></line>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                  <polyline points="16 16 12 12 8 16"></polyline>
                </svg>
              </div>
              <input
                ref={profileInputRef}
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUploadfoto}
                style={{ display: "none" }}
              />
            </div>
            <img
              style={{ width: "170px", height: "170px" }}
              className="img-fluid mb-3 mt-4"
              src={
                 imagePreviewUrlProfile ? imagePreviewUrlProfile : profileImage ? profileImage: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
              }
              alt="Foto de perfil del Usuario"
            />
          </div>
        </div>
      </div>
      <div className="col-lg-12 mb-4">
        <div className="card">
          <div className="card-body text-center shadow">
            <div className="d-flex align-items-center justify-content-center flex-column">
              <label htmlFor="vehicleImage" className="form-label mb-2">
                <strong>&nbsp;Foto del Vehículo</strong>
              </label>
              <div
                className="input-div"
                onClick={handleVehicleImageUploadClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  fill="none"
                  stroke="green"
                  className="icon"
                >
                  <polyline points="16 16 12 12 8 16"></polyline>
                  <line y2="21" x2="12" y1="12" x1="12"></line>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                  <polyline points="16 16 12 12 8 16"></polyline>
                </svg>
              </div>
              <input
                ref={vehicleInputRef}
                type="file"
                id="vehicleImage"
                accept="image/*"
                onChange={handleImageUploadfoto_Vehiculo}
                style={{ display: "none" }}
              />
            </div>
            <div className="conter-image">
            <img
              style={{ width: "170px", height: "170px" }}
              className="img-fluid mb-3 mt-4"
              src={ imagePreviewUrlVehicle ? imagePreviewUrlVehicle : vehicleImage ? vehicleImage : "https://via.placeholder.com/300"}
              alt="Foto del Vehiculo del Usuario"
            /></div>
          </div>
          <Button
          type="submit"
          
          variant="light"
          style={{
            color: "white",
            backgroundColor: "#1cc88a",
          }}
          onClick={handleUploadButtonClick}
        >
          Guardar Imágenes
        </Button>
        </div>
      </div>
    </div>
  );
}

export default FotoMulta;
