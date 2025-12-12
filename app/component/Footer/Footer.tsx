"use client";

import {
  Box,
  Typography,
  Link,
  Stack,
  Grid,
  IconButton,
} from "@mui/material";

import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#f4f4f4", pt: 1 }}>
      {/* Top Row: Heading + Icons */}
      <Box
        maxWidth="lg"
        sx={{
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
          px: 2,
        }}
      >
        {/* Heading */}
        <Typography
          fontSize="20px"
          fontWeight="bold"
          color="#1a237e"
          sx={{ ml: 1 }}
        >
          We are here to help you!
        </Typography>

        {/* Icons Row */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Go Mobile */}
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography fontSize="14px">Go Mobile:</Typography>
            <AndroidIcon fontSize="small" />
            <AppleIcon fontSize="small" />
            <PhoneIphoneIcon fontSize="small" />
          </Stack>

          {/* Social */}
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography fontSize="14px">Follow us on:</Typography>
            <FacebookIcon sx={{ color: "#1a73e8" }} />
            <TwitterIcon sx={{ color: "#000" }} />
            <LinkedInIcon sx={{ color: "#0a66c2" }} />
          </Stack>
        </Box>
      </Box>

      {/* Main Links Area */}
      <Box maxWidth="lg" sx={{ mx: "auto", mt: 1, px: 2 }}>
        <Grid container spacing={3}>
          {/* Column 1 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack spacing={0.8}>
              <FooterLink text="About Us" />
              <FooterLink text="IndiaMART Export" />
              <FooterLink text="Join Sales" />
              <FooterLink text="Success Stories" />
              <FooterLink text="Shipping & Delivery Policy" />
              <FooterLink text="Returns & Cancellation Policy" />
              <FooterLink text="Press Section" />
              <FooterLink text="Advertise with Us" />
              <FooterLink text="Investor Section" />
            </Stack>
          </Grid>

          {/* Column 2 */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack spacing={0.8}>
              <FooterLink text="Help" />
              <FooterLink text="Feedback" />
              <FooterLink text="Complaints" />
              <FooterLink text="Customer Care" />
              <FooterLink text="Jobs & Careers" />
              <FooterLink text="Contact Us" />
            </Stack>
          </Grid>

          {/* Suppliers Tool Kit */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography fontWeight="bold" mb={1}>
              Suppliers Tool Kit
            </Typography>
            <Stack spacing={0.8}>
              <FooterLink text="Sell on IndiaMART" />
              <FooterLink text="Latest BuyLead" />
              <FooterLink text="Learning Centre" />
              <FooterLink text="Ship With IndiaMART" />
            </Stack>
          </Grid>

          {/* Buyers Tool Kit */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography fontWeight="bold" mb={1}>
              Buyers Tool Kit
            </Typography>
            <Stack spacing={0.8}>
              <FooterLink text="Post Your Requirement" />
              <FooterLink text="Products You Buy" />
              <FooterLink text="Search Products & Suppliers" />
            </Stack>

            {/* Accounting Solutions */}
            <Typography fontWeight="bold" mt={2} mb={1}>
              Accounting Solutions
            </Typography>
            <Stack spacing={0.8}>
              <FooterLink text="Accounting Software" />
              <FooterLink text="Tally on Mobile" />
              <FooterLink text="GST e-Invoice" />
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Copyright */}
      <Box
        sx={{
          borderTop: "1px solid #ddd",
          mt: 2,
          pt: 1.5,
          pb: 1,
          textAlign: "center",
        }}
      >
        <Typography fontSize="13px" color="text.secondary">
          Copyright © 1996-2025 IndiaMART InterMESH Ltd. All rights reserved.
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          mt={1}
          sx={{ fontSize: "13px" }}
        >
          <FooterLink text="Terms of Use" />
          <FooterLink text="Privacy Policy" />
          <FooterLink text="Link to Us" />
        </Stack>
      </Box>
    </Box>
  );
}

interface FooterLinkProps {
  text: string;
}

function FooterLink({ text }: FooterLinkProps) {
  return (
    <Link
      href="#"
      underline="none"
      sx={{
        color: "#000",
        fontSize: "14px",
        "&:hover": { color: "primary.main" },
      }}
    >
      {text}
    </Link>
  );
}