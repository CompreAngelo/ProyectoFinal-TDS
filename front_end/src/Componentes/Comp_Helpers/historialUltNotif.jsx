import React from "react";

function HisUltNotif (){

    return (
        <>
        <div className="col-lg-4">
            <div className="card mb-3"></div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="text-success fw-bold m-0">Total de Multas</h6>
                </div>
                <div className="card-body">
                    <h4 className="small fw-bold">Server migration<span className="float-end">20%</span></h4>
                    <div className="progress progress-sm mb-3">
                        <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{width: '20%'}}><span className="visually-hidden">20%</span></div>
                    </div>
                    <h4 className="small fw-bold">Sales tracking<span className="float-end">40%</span></h4>
                    <div className="progress progress-sm mb-3">
                        <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: '40%'}}><span className="visually-hidden">40%</span></div>
                    </div>
                    <h4 className="small fw-bold">Customer Database<span className="float-end">60%</span></h4>
                    <div className="progress progress-sm mb-3">
                        <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '60%'}}><span className="visually-hidden">60%</span></div>
                    </div>
                    <h4 className="small fw-bold">Payout Details<span className="float-end">80%</span></h4>
                    <div className="progress progress-sm mb-3">
                        <div className="progress-bar bg-info" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{width: '80%'}}><span className="visually-hidden">80%</span></div>
                    </div>
                    <h4 className="small fw-bold">Account setup<span className="float-end">Complete!</span></h4>
                    <div className="progress progress-sm mb-3">
                        <div className="progress-bar bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}><span className="visually-hidden">100%</span></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default HisUltNotif;