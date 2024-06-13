import { useRef, useEffect } from 'react';
import mainStyles from './styles/main.module.css';
import './styles/p5CanvasStyles.css';
import ReactPlayer from 'react-player';
import dashboardOverviewVideo from './assets/video/dashboard_intro_vid_4.mp4';
import codepenProjectsVideo from './assets/video/codepen_projects_compressed.mp4';

import Sketch from './components/OrganicsAbstractP5';

import { ReactP5Wrapper } from "@p5-wrapper/react";

function App() {

  const dashboardIntroMediaRef = useRef(null);
  const codePenProjectsMediaRef = useRef(null);
  
  const p5AnimationRef = useRef(null);
  

  // colorsPalette = [
  //   // p5.color(0, 31, 57, 30),     
  //   p5.color(0, 51, 90, 30),
  //   p5.color(0, 71, 123, 30),
  //   p5.color(0, 91, 156, 30),
  //   // p5.color(0, 131, 222, 30),
  //   // p5.color(0, 151, 235, 30),
  //   // p5.color(0, 171, 235, 30),
  // ];
  

  function sketch(p5) {

    let organics = [];
    let change, colorsPalette;
    let colors = [];
    let index = 0;
    let max = 180;
    let min = 90;
    let opacityCounter = 0;

    p5.setup = () => {
      p5.createCanvas(1900, 805, p5.WEBGL);
      change = 0;
      colors = generateShiftedColors(min, max);

      for (var i=40;i<120;i+=4){
        organics.push(new Organic(
          0.1+1*i,                        
          p5.width/2,                         
          p5.height/2,                         
          i*2,
          i*p5.random(90),                       
                                  )
                     );
 
      }
    };
      
    p5.draw = () => {
      p5.background(1, 7, 31);

      let color = colors[index];

      for(var i=0; i < organics.length;i++){
        organics[i].show(change, color);
      }
    
      index = (index + 1) % colors.length;
      change+=0.009;


      p5.frameRate(24);
    };

    function generateShiftedColors(min, max) {
      const colors = [];


      
      function randomOpacity() {
        return Math.random() * (0.7 - 0.3) + 0.3;
      }
    
      // Red increases from 0 to max
      // for (let i = min; i <= max; i++) {
      //   colors.push([i, min, min, randomOpacity()]);
      // }
    
      // Green increases from 0 to max while red stays max
      for (let i = min; i <= max; i++) {
        colors.push([max, i, min, randomOpacity()]);
      }
    
      // Red decreases from max to 0 while green stays max
      // for (let i = max; i >= min; i--) {
      //   colors.push([i, max, min, randomOpacity()]);
      // }
    
      // Blue increases from 0 to max while red is 0
      // for (let i = min; i <= max; i++) {
      //   colors.push([min, max, i, randomOpacity()]);
      // }
    
      // Green decreases from max to 0 while blue stays max
      for (let i = max; i >= min; i--) {
        colors.push([min, i, max, randomOpacity()]);
      }
    
      // Red increases from 0 to max while green is 0
      // for (let i = min; i <= max; i++) {
      //   colors.push([i, min, max, randomOpacity()]);
      // }
    
      // Blue decreases from max to 0 while red stays max
      // for (let i = max; i >= min; i--) {
      //   colors.push([max, min, i, randomOpacity()]);
      // }
    
      return colors;
    }

    function Organic(radius,xpos,ypos,roughness,angle){

      // this.radius = radius; //radius of blob
      xpos = xpos - 900 //x position of blob
      ypos = ypos - 300; // y position of blob
      // this.roughness = roughness; // magnitude of how much the circle is distorted
      // this.angle = angle; //how much to rotate the circle by
      // this.color = color; // color of the blob
    
      this.show = function(change, color){

    
        // p5.noStroke(); // no stroke for the circle
        p5.strokeWeight(0.5); //We can use this to set thickness of the stroke if necessary
        p5.stroke('rgba(255, 255, 255, 0.3)');//We can use this to set the color of the stroke if necessary
        

          p5.fill(`rgba(0, ${color[1]}, 255, 0.1)`); //color to fill the blob
          opacityCounter = 0;



    
        p5.push(); //we enclose things between push and pop so that all transformations within only affect items within
        p5.translate(xpos, ypos); //move to xpos, ypos
        p5.rotate(angle + change); //rotate by this.angle+change
        p5.beginShape(); //begin a shape based on the vertex points below
        //The lines below create our vertex points
        var off = 0;
        for (var i = 0; i < p5.TWO_PI; i += 1) {
          var offset = p5.map(p5.noise(off, change), 0, 0.3, -roughness, roughness);
          var r = radius + offset;
          var x = r * p5.cos(i-1);
          var y = r * p5.sin(i+1);
          p5.vertex(x, y);
          off += 1;
        }
        p5.endShape(); //end and create the shape
        p5.pop();
    
        }
    }


  }

  return (
    <div className={mainStyles.appContainer}>
      <header className={mainStyles.headerContainer}>
      <div className={mainStyles.filterMask}></div>
        <div className={mainStyles.imageScrollContainer}>
          <div className={mainStyles.imageScrollView}></div>
        </div>
        <div className={mainStyles.devTitle}>
          <h2>Web Developer</h2>
          <h2>Gilberto Placidon</h2>
        </div>
      </header>

      <section className={mainStyles.projects}>

      <div id={mainStyles['p5Animation']} ref={p5AnimationRef}>
        <ReactP5Wrapper sketch={sketch} />
      </div>

        <h2>Frontend Development</h2>
        <div className={mainStyles.articleContainer}>
          <aritcle className={mainStyles.articleSection}>
            <div className={mainStyles.cardBackgroundUnderlay}></div>
            <h3>Interactive Dashboard</h3>
            <ReactPlayer
            ref={dashboardIntroMediaRef}
            url={dashboardOverviewVideo}
            stopOnUnmount={true}
            controls={false}
            playing={true}
            width="100%"
            height="auto"
            loop={true}
            muted={true}
            />

            <div className={mainStyles.projectDetails}>
              <p>Description</p>
              <p>An exploratory project that aimed at recreating the classic
                Xbox 360 Dashboard as a web application. 
              </p>
              <p>Features</p>
              <ul>
                <li>Custom created assets using Figma and CSS</li>
                <li>Dynamic content supported through use of Postgres database and an ExpressJS server.</li>
                <li>Smooth Animations fueled by GSAP (Greensock Library) and CSS Keyframes</li>
                <li>State management powered by Redux</li>
              </ul>
            </div>


          </aritcle>

          <aritcle className={mainStyles.articleSection}>
            <div className={mainStyles.cardBackgroundUnderlay}></div>

            <h3>Custom Webscraper</h3>
            <ReactPlayer
            ref={dashboardIntroMediaRef}
            url={dashboardOverviewVideo}
            stopOnUnmount={true}
            controls={false}
            playing={true}
            width="100%"
            height="auto"
            loop={true}
            muted={true}
            />

            <div className={mainStyles.projectDetails}>
              <p>Description</p>
              <p>
                A custom script designed to optimize data collection 
                by modifying csv files to aggregate data from various sources 
                to provide meaningful metric analysis.
              </p>
              <p>Features</p>
              <ul>
                <li>Conversion between csv and json to append data</li>
                <li>Reads links from a csv file to append respective data</li>
                <li>Visual chart is created using svg as output for the user to view</li>
              </ul>
            </div>
          </aritcle>

          <aritcle className={mainStyles.articleSection}>
            <div className={mainStyles.cardBackgroundUnderlay}></div>

            <h3>Code + Art</h3>
            <ReactPlayer
            ref={codePenProjectsMediaRef}
            url={codepenProjectsVideo}
            className={mainStyles.reactPlayer}
            stopOnUnmount={true}
            controls={false}
            playing={true}
            width="100%"
            height="auto"
            loop={true}
            muted={true}
            />

            <div className={mainStyles.projectDetails}>
              <p>Description</p>
              <p>
                Utilizing codepen to display art projects in motion using CSS, HTML ,and Javascript.
              </p>
              <p>Features</p>
              <ul>
                <li>Conversion between csv and json to append data</li>
                <li>Reads links from a csv file to append respective data</li>
                <li>Visual chart is created using svg as output for the user to view</li>
              </ul>
            </div>
          </aritcle>
          
        </div>

      </section>

      <section className={mainStyles.skillSection}>
        <h2>Skills</h2>
        <div className={mainStyles.skillItemList}>
          <div className={mainStyles.skillItemContainer}>
            <div className={mainStyles.webDevIcon}></div>
            <div className={mainStyles.skillDetails}>
              <p>Web Design & Development</p>
              <p>HTML | CSS | Javascript</p>
            </div>
          </div>
          <div className={mainStyles.skillItemContainer}>
            <div className={mainStyles.reactIcon}></div>
            <div className={mainStyles.skillDetails}>
              <p>Frontend Framework</p>
              <p>React JS</p>
            </div>
          </div>
          <div className={mainStyles.skillItemContainer}>
            <div className={mainStyles.figmaIcon}></div>
            <div className={mainStyles.skillDetails}>
              <p>UI & UX design</p>
              <p>Figma | Illustrator</p>
            </div>
          </div>
          <div className={mainStyles.skillItemContainer}>
            <div className={mainStyles.gsapIcon}></div>
            <div className={mainStyles.skillDetails}>
              <p>Animation</p>
              <p>Greensock Library</p>
            </div>
          </div>
        </div>

      </section>

      <section className={mainStyles.skillsetSection}>
        <div id={mainStyles['interfaceDevelopment']} className={mainStyles.skillsetModal}>
          <div className={mainStyles.skillsetDescription}>
            <h2>Interface Development</h2>
            <p>
            Specialize in bringing unique designs to life
            through the use of custom styling, assets, and animation.
            </p>
          </div>
        </div>
        <div id={mainStyles['database']}  className={mainStyles.skillsetModal}>
          <div className={mainStyles.skillsetDescription}>
            <h2>Database</h2>
            <p>
            Experienced in creating and integrating NoSQL, 
            and MySQL databases for frontend applications.
            </p>
          </div>
        </div>
        <div id={mainStyles['optimization']} className={mainStyles.skillsetModal}>
          <div className={mainStyles.skillsetDescription}>
            <h2>Optimization</h2>
            <p>
            Efficient use of loading and storing assets to avoid server costs. Further enhancements are achieved
            by proper rendering of web components to maintain usability in mobile devices.
            </p>
          </div>
        </div>
      </section>

      <section className={mainStyles.contactModule}>
        <h2>Contact Me</h2>
        <p>If you have any inquiries regarding design or website production, please feel
          free to conact me at the following:
        </p>
        <p>gilbert.placidon@gmail.com</p>
      </section>
    </div>
  );
}

export default App;
