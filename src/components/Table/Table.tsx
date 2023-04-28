import { useEffect, useState } from 'react';

import './Table.css';

import Pagination from './Pagination/Pagination';
import { BsChevronExpand } from "react-icons/bs";
import { globalComercios } from '../../data/globalData';
import { Comercio, dataModel } from '../../models/TableModels';

const Table = ({ searchValues, isActive, isLoading }: any) => {

    const [arrayComercio, setArrayComercio] = useState<Comercio[]>([]);

    const [arrayDataModel, setArrayDataModel] = useState<dataModel>({
        "data": globalComercios,
        "page": 1,
        "pages": 1000,
        "rowPerPage": 10,
        "total": 1000
    });

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [recordsPerPage] = useState(100);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = arrayComercio.slice(indexOfFirstRecord,
        indexOfLastRecord);
    const nPages = Math.ceil(arrayComercio.length / recordsPerPage)

    const handleSortComercio = () => {
        const sortedArrayComercio = arrayComercio.slice().sort((p1, p2) => (p1.Comercio > p2.Comercio) ? 1 : (p1.Comercio < p2.Comercio) ? -1 : 0)
        setArrayComercio(sortedArrayComercio);
    }

    const handleSortCuit = () => {
        const sortedArrayComercio = arrayComercio.slice().sort((p1, p2) => (p1.CUIT > p2.CUIT) ? 1 : (p1.CUIT < p2.CUIT) ? -1 : 0)
            setArrayComercio(sortedArrayComercio);
    }

    useEffect(() => {
        if (searchValues === "" && isActive === "2") {
            setArrayComercio(arrayDataModel.data);
        } else if (searchValues !== "" && isActive === "2") {
            setArrayComercio(arrayDataModel.data.filter(comercio => comercio.Comercio.toLowerCase().includes(searchValues.toLowerCase()) || comercio.CUIT.toLowerCase().includes(searchValues.toLowerCase())));
        } else if ((searchValues === "" && isActive === "0") || (searchValues === "" && isActive === "1")) {
            setArrayComercio(arrayDataModel.data.filter(comercio => comercio.Activo.includes(isActive)));
        } else {
            setArrayComercio(arrayDataModel.data.filter(comercio => (comercio.Comercio.toLowerCase().includes(searchValues.toLowerCase()) && comercio.Activo.includes(isActive)) || (comercio.CUIT.toLowerCase().includes(searchValues.toLowerCase()) && comercio.Activo.includes(isActive))));
        }
    }, [isLoading])

    return (
        <>
            {currentRecords.length > 0 ?
                <><table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th onClick={() => handleSortComercio()}>Comercio <BsChevronExpand /></th>
                            <th onClick={() => handleSortCuit()}>CUIT <BsChevronExpand /></th>
                            <th>Comercio 1</th>
                            <th>Comercio 2</th>
                            <th>Comercio 3</th>
                            <th>Comercio 4</th>
                            <th>Comercio 5</th>
                            <th>Comercio 6</th>
                            <th>Balance Actual</th>
                            <th>Activo</th>
                            <th>Ultima venta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map(comercio =>
                            <tr>
                                <td>{comercio.ID}</td>
                                <td>{comercio.Comercio}</td>
                                <td>{comercio.CUIT}</td>
                                <td>{comercio.Comercio1}</td>
                                <td>{comercio.Comercio2}</td>
                                <td>{comercio.Comercio3}</td>
                                <td>{comercio.Comercio4}</td>
                                <td>{comercio.Comercio5}</td>
                                <td>{comercio.Comercio6}</td>
                                <td>{comercio.BalanceActual}</td>
                                <td>{comercio.Activo}</td>
                                <td>{comercio.UltimaVenta}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                    <Pagination
                        nPages={nPages}
                        setCurrentPage={setCurrentPage}
                    /></>
                :
                <h2>Comercio no encontrado</h2>
            }
        </>
    )
}

export default Table;