import AppContent from '../Content/AppContent';
import AppbarGeneric from '../Generics/AppbarGeneric';
import React from "react";
import PursesDoughnutDiagram from '../Diagrams/PursesDoughnutDiagram';
  
const HomePage: React.FC = () => {
    
    return(
        <React.Fragment>
            <AppContent>
                <AppbarGeneric />
                <div className="contentDiv">
                    <PursesDoughnutDiagram />
                </div>
            </AppContent>
        </React.Fragment>
    );
}

export default HomePage;