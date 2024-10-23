import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Tour Booking
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Popular Tours
              </Typography>
              {/* Add tour cards */}
            </CardContent>
          </Card>
        </Grid>

        {/* Add more content sections */}
      </Grid>
    </Container>
  );
}
