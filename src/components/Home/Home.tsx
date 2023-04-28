import { useState } from "react";

import "./Home.css";

import axios from "axios";
import Table from "../Table/Table";
import { baseURL } from "../../data/globalData";

const Home = () => {

    const [searchValue, setSearchValue] = useState<string>("");
    const [isActive, setIsActive] = useState<string>("2");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCleanButton = () => {
        setSearchValue("");
        setIsActive("2");
    }

    const handleButtonSearch = async () => {
        setIsLoading(true);
        console.log("URL", baseURL + "?searchValue=" + searchValue + "&" + "isActive=" + isActive);
        await axios.get(baseURL, {
            params: {
                searchValue: searchValue,
                isActive: isActive
            }
        }).catch(e => {
            console.log("PARAMS SENT", e.config.params);
        });
        setIsLoading(false);
    }

    return (
        <div id="Home">
            <h3 className="text-center">Koibanx Challenge - Erik Garfia</h3>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="mt-2">
                            <div className="text-start">
                                <h6>Búsqueda</h6>
                            </div>
                            <input type="email" className="form-control" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                            <div id="textHelp" className="form-text text-start">Puedes buscar por ID, Comercio o CUIT</div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div>
                            <h6>Filtro</h6>
                        </div>
                        <div className="btn-group mt-2 mb-5" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" value={"1"} onChange={(e) => setIsActive(e.target.value)} checked={isActive == "1" ?? true} />
                            <label className="btn btn-outline-primary" htmlFor="btnradio1">Activos</label>
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" value={"0"} onChange={(e) => setIsActive(e.target.value)} checked={isActive == "0" ?? true} />
                            <label className="btn btn-outline-primary" htmlFor="btnradio2">Inactivos</label>
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-3 mb-5 d-flex justify-content-center">
                <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-primary text-uppercase" onClick={handleButtonSearch}>Buscar</button>
                <button type="button" className="btn btn-link" onClick={handleCleanButton}>Limpiar Filtros</button>
                </div>
               
            </div>
            <div>
                {isLoading ? <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div> : <Table searchValues={searchValue} isActive={isActive} isLoading={isLoading} />}
            </div>
        </div>
    )
}

export default Home;