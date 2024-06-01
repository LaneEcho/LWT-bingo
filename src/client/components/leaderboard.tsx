import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { subscribeToTopScores } from "../../firebase/firebase-api";
import { Card, Grid, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

function Leaderboard() {
  const { user } = useAuth();
  const [topScores, setTopScores] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const unsubscribe = subscribeToTopScores(
      (scores) => {
        setTopScores(scores);
      },
      (error) => {
        setError(error.message);
        console.error(error);
      }
    );

    return () => unsubscribe(); // Clean up the subscription when the component unmounts
  }, [user?.email]);

  const theme = useTheme();

  function getRowColor(index: number) {
    // TODO: Use theme colors...
    const colors = [
      "#46A4DB", // Blue
      "#D03574", // Pink
      "#93C356", // Light Green
      "#5ABCC9", // Light Blue
      "#693E92", // Purple
    ];

    // Cycle through colors for other positions
    return {
      backgroundColor: colors[(index - 1) % colors.length],
      color: "#000000",
    };
  }

  if (error) {
    return (
      <Typography>
        Whoops, something went wrong. Please try refreshing the page!
      </Typography>
    );
  }

  return (
    <>
      <Typography variant={"h4"} color={"grey"}>
        Leaderboard
      </Typography>
      {topScores.map((row, index) => (
        <Card
          key={index}
          sx={[
            getRowColor(index + 1),
            { borderRadius: "10px  " },
            { border: row?.id === user?.uid ? `4px solid #FAFF03` : undefined },
          ]}
        >
          <Grid
            container
            sx={{
              padding: "4px 8px",
            }}
          >
            <Grid item flex={2}>
              {index + 1}
            </Grid>
            <Grid item flex={6}>
              {row?.username}
            </Grid>
            <Grid item alignItems={"flex-end"} flex={4}>
              {row.totalScore}
            </Grid>
          </Grid>
        </Card>
      ))}
    </>
  );
}

export default Leaderboard;
