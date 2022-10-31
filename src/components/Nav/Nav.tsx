import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import NavWhiteLogo from "../../assets/bachartawhite.svg";
import NavLogo from "../../assets/bacharta.svg";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { KakaoToken } from "../../store/store";
import Login from "../Login/Login";
import theme from "../../styles/theme";
import { kakaoLogout } from "../../api/authAPI";
import { getProfile } from "../../api/profileAPI";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@mui/material";
import { tokenStorage } from "../../storage/storage";

const pages = ["Home", "Maps", "OutFits"];

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const location = useLocation();
  const pageUrl = location.pathname;

  const navigate = useNavigate();
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const authToken = tokenStorage.get("access_token");
  const [token, setToken] = useRecoilState(KakaoToken);

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToPage = (page: string) => {
    if (page === "Home") navigate("/");
    if (page === "Maps") navigate("/maps");
    if (page === "OutFits") navigate("/outfits");
  };

  const logout = () => {
    kakaoLogout();
    navigate("/");
    tokenStorage.remove("access_token");
  };

  const { data } = useQuery(["getProfile"], () => getProfile(authToken), {
    enabled: !!authToken,
  });

  return (
    <>
      <Login />
      {pageUrl.length === 1 ? (
        <AppBar position="static" style={{ background: `${theme.mainColor}` }}>
          <Container maxWidth="lg">
            <Toolbar
              disableGutters
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "2px solid #8091ef",
              }}
            >
              <Logo alt="logo" src={NavWhiteLogo} onClick={goToHome} />
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
              <MenuBox>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    marginRight: "50px",
                  }}
                >
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={() => goToPage(page)}
                      sx={{ my: 2, color: "white", display: "block" }}
                      style={{ marginRight: "30px", fontSize: "18px" }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
                {authToken ? (
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton
                        onClick={handleOpenUserMenu}
                        sx={{ p: 0 }}
                        style={{ display: "flex" }}
                      >
                        <ProfileName>
                          {data?.data.kakao_account.profile.nickname}
                        </ProfileName>
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            data?.data.kakao_account.profile.thumbnail_image_url
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography
                          textAlign="center"
                          onClick={() => {
                            logout();
                          }}
                        >
                          로그아웃
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    onClick={handleLogin}
                    sx={{ my: 2, color: "white", display: "block" }}
                    style={{ marginRight: "30px", fontSize: "18px" }}
                  >
                    카카오 로그인
                  </Button>
                )}
              </MenuBox>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <AppBar position="static" style={{ background: `${theme.white}` }}>
          <Container maxWidth="lg">
            <Toolbar
              disableGutters
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Logo alt="logo" src={NavLogo} onClick={goToHome} />
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LOGO
              </Typography>
              <MenuBox>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    marginRight: "50px",
                  }}
                >
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={() => goToPage(page)}
                      sx={{ my: 2, color: "black", display: "block" }}
                      style={{ marginRight: "30px", fontSize: "18px" }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
                {authToken ? (
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton
                        onClick={handleOpenUserMenu}
                        sx={{ p: 0 }}
                        style={{ display: "flex", color: `${theme.black}` }}
                      >
                        <ProfileName>
                          {data?.data.kakao_account.profile.nickname}
                        </ProfileName>
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            data?.data.kakao_account.profile.thumbnail_image_url
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography
                          textAlign="center"
                          onClick={() => {
                            logout();
                          }}
                        >
                          로그아웃
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    onClick={handleLogin}
                    sx={{ my: 2, color: "black", display: "block" }}
                    style={{ marginRight: "30px", fontSize: "18px" }}
                  >
                    카카오 로그인
                  </Button>
                )}
              </MenuBox>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
};
export default Nav;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileName = styled.div`
  margin-right: 15px;
  font-size: 18px;
  color: white;
`;

const Logo = styled.img`
  width: 200px;
  height: 90px;
  cursor: pointer;
`;
