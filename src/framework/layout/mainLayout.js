import styles from './mainLayout.module.css';
import contentData from '../../data/contents.json';
import BusinessCard from '../cards/business-card/businessCard';
import EducationCard from '../cards/education/education';
import SkillsCard from '../cards/skills/skills';
import ProjectCard from '../cards/projects/projects';
import JobCard from '../cards/jobs/job';

function prettyFormatStringNode (text="") { // We are civilised after all
    if (!text.endsWith("."))
    {
        text += ".";
    }
    if (text.charAt(0) !== text.charAt(0).toUpperCase())
    {
        text = text.charAt(0).toUpperCase() + text.substring(1);
    }
    return text;
}

const experiences = (
    <div className={styles.topic}>
        <h2 className={styles.topicTitle}>Experiences</h2>
        <div className={styles.cardContainer}>
        {
            contentData.jobs.map(element => <JobCard data={element}/>)
        }
        </div>
    </div>
);

export default function mainLayout(props) {
    return (
        <div className={styles.container}>
            {/* Container for the portfolio image and the businesscard data. Aligns to the left on desktop, to top on mobile! */}
            <div className={styles.left}>
                <BusinessCard data={contentData.businessCard}/>
                <div id={styles.mobileJumpButton}>
                    <button type="button" onClick={()=>{document.getElementById('mainContentContainer').scrollIntoView();}}> <i class="fas fa-angle-down fa-2x"></i> </button>
                </div>
            </div>
            {/* Container for the main page contents, basically everything. Alight to the right on desktop, to bottom on mobile! */}
            <div id="mainContentContainer" className={styles.right}>
                <div className={styles.themeSwitch}>
                    <button className={styles.themeIcon} onClick={props.setTheme}>{ props.theme == "dark" ? <i class="fas fa-sun"></i> : <i class="fas fa-moon"></i>}</button>
                </div>
                {/* Introduction topic, this loads user written comments. */}
                <div className={styles.topic}>
                    <h2 className={styles.topicTitle}>Introduction</h2>
                    <div className={styles.cardContainer}>
                        {
                            contentData.intro.map(element => <p className={styles.introLines}>{prettyFormatStringNode(element)}</p>)
                        }
                    </div>
                </div>
                {/* Skills topic, this loads a list of user defined categories and their contents (list of strings). */}
                <div className={styles.topic}>
                    <h2 className={styles.topicTitle}>Skills</h2>
                    <div className={styles.cardContainer}>
                        {
                            contentData.skills.map(element => <SkillsCard data={element}/>)
                        }
                    </div>
                </div>
                {/* Education topic, this one loads in a list of user defined education placements. */}
                <div className={styles.topic}>
                    <h2 className={styles.topicTitle}>Education</h2>
                    <div className={styles.cardContainer}>
                        {
                            contentData.education.map(element => <EducationCard data={element}/>)
                        }
                    </div>
                </div>
                {/* Jobs topic, loads in the list of user defined past jobs ordered from newest to oldest. */}
                {
                    contentData.jobs.length!==0? experiences : ""
                }
                {/* Projects! This loads in a list of featured projects. Can pull data from third-party
                    sites with the right configuration which is nice c:
                */}
                <div className={styles.topic}>
                    <h2 className={styles.topicTitle}>Selected Projects</h2>
                    {
                        contentData.projects.map(element => <ProjectCard data={element}/>)
                    }
                </div>
                {/* Test! */}
                <div id={styles.footer}>
                    <a rel="noreferrer" target="_blank" href="https://github.com/Xerren09/personal-portfolio"><em>Created by me! - 2022</em></a>
                </div>
            </div>
        </div>
    )
}
