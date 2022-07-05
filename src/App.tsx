import React from 'react';
import './App.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import hk from './assets/img/hk.png';
import i3 from './assets/img/i3.png';
import dororo from './assets/img/dororo.png';
import fh from './assets/img/fh.png';
import pokedux from './assets/img/pokedux.png';
import todomachine from './assets/img/todomachine.png';

type imageData = {
  uri: string,
  alt: string,
  siteUri: string
}

type appString = {
  en: string,
  es: string
}

type appStrings = {
  title: appString,
  subtitle: appString,
  banner: appString
}

const strings: appStrings = {
  title: {
    en: 'portfolio🤓',
    es: 'portafolio🤓'
  },
  subtitle: {
    en: 'Here you can find a small showcase of some of the projects I have worked on, or have developed myself.',
    es: 'Aquí podrás encontrar una pequeña muestra de los proyectos en los que he participado.'
  },
  banner: {
    en: 'projectsihaveworkedon',
    es: 'proyectosenlosqueheparticipado'
  }
}

function App() {
  var title: string;
  var subtitle: string;
  var banner: string;


  var spanish = window.navigator.language === 'es-ES';
  const imagesArray: imageData[] = [
    {
      uri: hk,
      alt: 'Pastelería HK',
      siteUri: 'https://sharp-mcnulty-bd0b4d.netlify.app/'
    },
    {
      uri: i3,
      alt: 'Imaginary Industrial Illusions',
      siteUri: 'https://imaginaryillusions.github.io/'
    },
    {
      uri: dororo,
      alt: 'DororoApp',
      siteUri: 'https://cranky-pare-7e3d9c.netlify.app/'
    },
    {
      uri: fh,
      alt: 'My site',
      siteUri: 'https://fehernandez.com/'
    },
    {
      uri: pokedux,
      alt: 'Pokédux',
      siteUri: 'https://fehernandez.com/pokedux'
    },
    {
      uri: todomachine,
      alt: 'ToDo Machine',
      siteUri: 'https://fehernandez.com/todo-machine'
    }
  ]

  const reduceArray = (arr: imageData[]) => {
    const chunkSize = 3;
    return arr.reduce(
      (resultArr: imageData[][], item: imageData, index: number) => {
        const chunkIndex = Math.floor(index / chunkSize);
        if (!resultArr[chunkIndex]) {
          resultArr[chunkIndex] = [];
        }

        resultArr[chunkIndex].push(item);

        return resultArr;
      }, []
    );
  }

  const imagesArr = reduceArray(
    imagesArray.map(
      obj => ({ obj, sort: Math.random()})
    ).sort(
      (a, b) => a.sort - b.sort
    ).map(
      ((obj) => obj.obj)
    )
  );

  const imagesLoaded = require('imagesloaded');
  gsap.registerPlugin(ScrollTrigger);

  const images = gsap.utils.toArray('img');
  const loader: Element | null = document.querySelector('.loader--text');
  const updateProgress = (instance: any) => 
    loader!.textContent = `${Math.round(instance.progressedCount * 100 / images.length)}%`;

  const showDemo = () => {
    document.body.style.overflow = 'auto';
    document.scrollingElement!.scrollTo(0, 0);
    gsap.to(document.querySelector('.loader'), { autoAlpha: 0 });
    
    gsap.utils.toArray('section').forEach((section: any, index) => {
      const w = section.querySelector('.wrapper');
      const [x, xEnd] = (index % 2) ? ['100%', (w.scrollWidth - section.offsetWidth) * -1] : [w.scrollWidth * -1, 0];
      gsap.fromTo(w, {  x  }, {
        x: xEnd,
        scrollTrigger: { 
          trigger: section, 
          scrub: 0.5 
        }
      });
    });
  }

  imagesLoaded(images).on('progress', updateProgress).on('always', showDemo);

  return (
    <>
      <div className="loader df aic jcc">
        <div>
          <h1>Loading...</h1>
          <h2 className="loader--text">
            0%
          </h2>
        </div>
      </div>
      <div className="portfolio-wrapper">
        <header className="df aic jcc">
          <div>
            <h1>
              <a className='unstyled-link' href="https://fehernandez.com/">
                felipe hernández 👾
              </a>
            </h1>
            <h2>{spanish ? strings.title.es : strings.title.en}</h2>
            <p>{spanish ? strings.subtitle.es : strings.subtitle.en}</p>
          </div>
        </header>
        <section className="portfolio-text">
          <div className="wrapper text">
            {spanish ? strings.banner.es : strings.banner.en}
          </div>
        </section>
        {imagesArr.map(
          (imgChunk: imageData[]) => {
            return (
              <section className="portfolio-gallery">
                <ul className="wrapper">
                  {imgChunk.map(
                    (img: imageData) => {
                      return (
                        <li key={img.uri}>
                          <a href={img.siteUri} target='_blank' rel='noopener noreferrer'>
                            <img src={img.uri} alt={img.alt} width={1240} height={874} />
                          </a>
                        </li>
                      );
                    } 
                  )}
                </ul>
              </section>
            );
          }
        )}
        <section className="portfolio-text">
          <div className="wrapper text">
            {spanish ? strings.banner.es : strings.banner.en}
          </div>
        </section>
        <footer className="df aic jcc">
          <p>All rights reserved. Made with love by <a href="https://fehernandez.com">FH.</a></p>
        </footer>
      </div>
    </>
  );
}

export default App;
