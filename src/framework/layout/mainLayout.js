import React, { useState, useEffect } from 'react';

import styles from './mainLayout.module.css';
import BusinessCard from '../sections/business-card/businessCard';

import IntroSection from '../sections/intro/index.js';
import SkillsSection from '../sections/skills/index.js';
import EducationSection from '../sections/education/index.js';
import JobsSection from '../sections/jobs/index.js';
import ProjectsSection from '../sections/projects/index.js';

export default function MainPageLayout(props) {
    const [pageData, setPageData] = useState();

    useEffect(() => {
        fetch("data/contents.json").then((response) => {
            response.json().then(pageContents => {
                setPageData(pageContents);
            });
        });
    }, []);

    if (pageData != undefined && pageData.businessCard != undefined) {
        return (
            <div className={styles.container}>
                {/* Container for the portfolio image and the businesscard data. Aligns to the left on desktop, to top on mobile! */}
                <div id="mainFlairContainer" className={styles.left}>
                    <BusinessCard data={pageData.businessCard}/>
                    <div id={styles.mobileJumpButton}>
                        <button type="button" onClick={()=>{document.getElementById('mainContentContainer').scrollIntoView();}}> <i class="fas fa-angle-down fa-2x"></i> </button>
                    </div>
                </div>
                {/* Container for the main page contents, basically everything. Aligns to the right on desktop, to bottom on mobile! */}
                <div id="mainContentContainer" className={styles.right}>
                    <div className={styles.themeSwitch}>
                        <button className={styles.themeIcon} onClick={props.setTheme}>{ props.theme == "dark" ? <i class="fas fa-sun"></i> : <i class="fas fa-moon"></i>}</button>
                    </div>
                    {/* Introduction topic, this loads user written comments. */}
                    <IntroSection data={ pageData.intro } />
                    {/* Skills topic, this loads a list of user defined categories and their contents (list of strings). */}
                    <SkillsSection data={ pageData.skills } />
                    {/* Education topic, this one loads in a list of user defined education placements. */}
                    <EducationSection data={ pageData.education } />
                    {/* Jobs topic, loads in the list of user defined past jobs ordered from newest to oldest. */}
                    <JobsSection data={ pageData.jobs }/>
                    {/* Projects! This loads in a list of featured projects. Can pull data from third-party
                        sites with the right configuration which is nice c:
                    */}
                    <ProjectsSection data={ pageData.projects } />
                    <div id={styles.footer}>
                        <a rel="noreferrer" target="_blank" href="https://github.com/Xerren09/personal-portfolio"><em>Created by me! - 2022</em></a>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (<div></div>)
    }
}
