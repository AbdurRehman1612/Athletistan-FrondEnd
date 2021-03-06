import React, { useState } from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import styles from "../olympics.module.css";
import Button from "@material-ui/core/Button";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useWideCardMediaStyles } from "@mui-treasury/styles/cardMedia/wide";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";

import { useBouncyShadowStyles } from "@mui-treasury/styles/shadow/bouncy";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    width: 400,
    margin: "auto",
    boxShadow: "none",
    borderRadius: 30,
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: "initial",
  },
}));

export const NewsCardDemo = React.memo(function NewsCard() {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const shadowStyles = useBouncyShadowStyles();

  const [video, setVideo] = useState(false);

  return (
    <div>
      <Card className={cx(styles.root, shadowStyles.root)}>
        <div>
          <CardMedia classes={mediaStyles} image="./mahnoorshehzad.jpg" />

          <CardContent className={styles.content}>
            <TextInfoContent
              classes={textCardContentStyles}
              overline={"Pakistani Women's Badminton Player"}
              heading="Mahnoor Shehzad"
              body="Mahnoor Shahzad was the women's singles champion at the 2017 Pakistan International tournament. Mahnoor represented Pakistan at the 2020 Summer Olympics Tokyo after receiving a tripartite invitation, becoming the first Pakistani badminton player to qualify at the Olympics Games."
            />
            <br />
            <a
              data-bss-hover-animate="pulse"
              data-bs-target="#mahnoor"
              data-bs-toggle="modal"
              onClick={() => setVideo(true)}
              color={"primary"}
              fullWidth
              className={styles.cta}
            >
              Find Out More <ChevronRightRounded />
            </a>
          </CardContent>
        </div>
      </Card>
      <div
        className={`${styles.modal} ${video && `${styles.show}`}`}
        role="dialog"
        tabindex="-1"
        id="mahnoor"
      >
        {video ? (
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            style={{ width: "1000px", height: "400px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setVideo(false)}
                >
                  X
                </button>
              </div>
              <div className="video-container">
                {video ? (
                  <iframe
                    style={{ width: "498px", height: "400px" }}
                    allowfullscreen=""
                    frameborder="0"
                    src="https://www.youtube.com/embed/H_nLm3MuIVk"
                  ></iframe>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default NewsCardDemo;
