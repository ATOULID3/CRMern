import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);

  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [adding, setAdding] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3000/api/user", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.email) setUser(data);
        else navigate("/login");
      })
      .catch(() => navigate("/login"));

    fetchClients();
  }, [navigate]);

  const fetchClients = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/clients", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClients(data);
        setLoadingClients(false);
      })
      .catch((err) => {
        console.error("Error fetching clients", err);
        setLoadingClients(false);
      });
  };

  const handleAddClient = async () => {
    const token = localStorage.getItem("token");

    if (!newClientName || !newClientEmail) {
      alert("Please fill all fields.");
      return;
    }

    setAdding(true);
    try {
      const response = await fetch("http://localhost:3000/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: newClientName,
          email: newClientEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewClientName("");
        setNewClientEmail("");
        fetchClients(); // refresh client list
        alert("Client added successfully");
      } else {
        alert(data.error || "Failed to add client");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setAdding(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography variant="h4">Dashboard</Typography>
        {user ? (
          <>
            <Typography variant="h6">Welcome, {user.username}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Button
              variant="outlined"
              color="error"
              sx={{ mt: 2 }}
              onClick={handleLogout}
            >
              Logout
            </Button>

            {/* Add Client Form */}
            <Box sx={{ mt: 6, textAlign: "left" }}>
              <Typography variant="h5" gutterBottom>
                Add New Client
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Client Name"
                    fullWidth
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Client Email"
                    fullWidth
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    onClick={handleAddClient}
                    disabled={adding}
                  >
                    {adding ? "Adding..." : "Add Client"}
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* Clients List */}
            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" gutterBottom>
                Clients List
              </Typography>
              {loadingClients ? (
                <CircularProgress />
              ) : clients.length ? (
                <List>
                  {clients.map((client) => (
                    <Box key={client.id}>
                      <ListItem>
                        <ListItemText
                          primary={client.name}
                          secondary={client.email}
                        />
                      </ListItem>
                      <Divider />
                    </Box>
                  ))}
                </List>
              ) : (
                <Typography>No clients found.</Typography>
              )}
            </Box>
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
