import styles from "./NoDataMessage.module.scss";

type NoDataMessageTypes = {
  data: string;
};

export default function NoDataMessage({ data }: NoDataMessageTypes) {
  return <div className={styles.noLogs}>{data}</div>;
}
