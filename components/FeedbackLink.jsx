import React from 'react'
import styles from "../app/page.module.css";

const FeedbackLink = () => {
    const email = "imerya3638@uhcl.edu,gichanas3673@uhcl.edu,mcgowant5347@uhcl.edu";
    const subject = encodeURIComponent("HOV Locator user test comments / suggestions");
  
    return (
      <a 
        href={`mailto:${email}?subject=${subject}`}
        className={styles.feedbackLink}
      >
        Feedback
      </a>
    );
};

export default FeedbackLink;