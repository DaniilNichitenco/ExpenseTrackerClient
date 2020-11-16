import AppContent from '../Content/AppContent';
import AppbarGeneric from '../Generics/AppbarGeneric';
import React from "react";
import PieDiagram from '../Diagrams/PieDiagram';
import DoughnutDiagram from '../Diagrams/DoughnutDiagram';
import LineDiagram from '../Diagrams/LineDiagram';
  
const HomePage: React.FC = () => {
    
    return(
        <React.Fragment>
            <AppContent>
                <AppbarGeneric />
                <PieDiagram />
                <DoughnutDiagram />
                <LineDiagram />
            </AppContent>
        </React.Fragment>
    );
}

export default HomePage;