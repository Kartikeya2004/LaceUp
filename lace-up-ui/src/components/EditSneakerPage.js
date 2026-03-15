/* File: src/components/EditSneakerPage.js - FINAL POLISHED FORM */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, Box, TextField, Button, Container, CircularProgress 
} from '@mui/material';

const API_URL = 'http://localhost:8080/api/sneakers';

export default function EditSneakerPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', brand: '', releaseDate: '', imageUrl: '', description: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH EXISTING DATA to pre-fill the form
  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/${id}`)
      .then(response => {
        setFormData(response.data); 
        setLoading(false);
      })
      .catch(err => {
        setError("Sneaker not found or API error.");
        setLoading(false);
      });
  }, [id]);

  // Handle changes in any text field
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // HANDLE SUBMISSION (The PUT Request)
  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    axios.put(`${API_URL}/${id}`, formData) 
      .then(response => {
        alert(`Sneaker "${response.data.name}" successfully updated!`);
        navigate(`/sneaker/${id}`); 
      })
      .catch(error => {
        console.error("Error updating sneaker:", error);
        alert('Error updating sneaker. Please check the console.');
      });
  };

  if (loading) { return ( <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box> ); }
  if (error) { return <Typography variant="h4" color="error" align="center" mt={5}>{error}</Typography>; }

  // Renders the pre-filled form
  return (
    <Container maxWidth="sm"> 
      
      {/* NEW: Outer Box for the professional card look */}
      <Box className="p-8 rounded-xl bg-slate-800 shadow-2xl border border-slate-700">
          
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          className="font-bold text-white mb-8" 
        >
          Edit Sneaker: {formData.name}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} 
          // NEW: Increased gap for better visual spacing
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} 
        >
          {/* Fields are pre-filled using value={formData.fieldName} */}
          <TextField required fullWidth label="Sneaker Name" name="name" 
            value={formData.name || ''} onChange={handleChange} />
          <TextField required fullWidth label="Brand" name="brand"
            value={formData.brand || ''} onChange={handleChange} />
          <TextField required fullWidth label="Release Date" name="releaseDate" type="date"
            value={formData.releaseDate || ''} onChange={handleChange} />
          <TextField required fullWidth label="Image URL" name="imageUrl" type="url"
            value={formData.imageUrl || ''} onChange={handleChange} />
            
          {/* Detailed Description */}
          <TextField required fullWidth multiline rows={4} label="Detailed Description" 
            name="description" value={formData.description || ''} onChange={handleChange}
          />
          
          <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }} >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
}