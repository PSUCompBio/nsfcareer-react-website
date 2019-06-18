import React, { Fragment } from "react";

import "./HomePage.css";

const HomePage = () => (
  <Fragment>

		<h1 className="topspace">CAREER: Multiscale Modeling of Axonal Fiber Bundles in the Brain</h1>
		<h2 className="topspace2">NSF CAREER Project, PI: Reuben H. Kraft, Ph.D., Award Number: 1846059</h2>

		<p className="text1 topspace2"> Brain injuries are a significant health concern
for civilian and military populations. This Faculty Early Career Development Program (CAREER)
 project will contribute to the understanding of brain trauma by developing advanced computer
models that link neuroimaging results, biomechanical assessments, and computational modeling of
the brain. More broadly, the continued pursuit of the development and validation of numerical diagnostics
 is anticipated to advance the emerging field of computational medicine.
 < /p>


 <div className="row2">
   <div className="column nsf-img left">
     <img src="/img/NSF_4-Color_bitmap_Logo-sm.png" alt="nsf-img" />
   </div>
   <div className="column  right">
     <img src="/img/PSU_ENG_RGB_287_284-01_1.png" alt="psu-img" />
   </div>
 </div>

  </Fragment>
);

export default HomePage;
