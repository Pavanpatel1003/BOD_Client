import React from 'react'

const EligibleBenchCandidates = () => {
    return (
        <>
            <div className="container-fluid table-format">
                <div className="table-heading">
                    <h5>Eligible Bench Candidates </h5>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>YOE</th>
                                <th>Skills</th>
                                <th>Resume</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Name">Anil</td>
                                <td data-label="YOE">9</td>
                                <td data-label="Skills">Lorem Ipsum</td>
                                <td data-label="Resume">
                                <span className="view-details">View</span>
                                </td>
                                <td data-label="Action">
                                <span className="view-details">Schedule</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default EligibleBenchCandidates
