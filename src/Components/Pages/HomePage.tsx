import AppContent from '../Content/AppContent';
import AppbarGeneric from '../Generics/AppbarGeneric';
import React from "react";
import PursesDoughnutDiagram from '../Diagrams/PursesDoughnutDiagram';
  
const HomePage: React.FC = () => {
    
    return(
        <React.Fragment>
            <div className="contentDiv">
                <PursesDoughnutDiagram />
            </div>
        </React.Fragment>
    );
}

export default HomePage;