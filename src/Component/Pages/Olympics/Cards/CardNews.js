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
  console.log(video);
  return (
    <div>
      <Card className={cx(styles.root, shadowStyles.root)}>
        <div>
          <CardMedia classes={mediaStyles} image="./talhatalib.jpg" />

          <CardContent className={styles.content}>
            <TextInfoContent
              classes={textCardContentStyles}
              overline={"Pakistani WeightLifter"}
              heading="Talha Talib"
              body="The young weightlifter from Gujranwala, making his Olympics debut, took part in the 67kg category and held the gold medal spot until the final round before eventually being bumped down and denied a podium finish."
            />
            <br />
            <a
              data-bss-hover-animate="pulse"
              data-bs-target="#talhatalib"
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
        id="talhatalib"
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
                    src="https://www.youtube.com/embed/CAkk2O5U1Vs"
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
