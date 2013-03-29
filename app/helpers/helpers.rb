helpers do 
  def login
    @user = User.find_by_email(params[:email])
    if @user.password == params[:password]
      session[:user] = @user.token
      @user.save
      redirect '/games'
    else
      @message = "login failed"
      erb :index
    end
  end


  def signup
    @user = User.new(params[:join])
    if @user.save && params[:join][:password] == params[:password_again]
      session[:user] = @user.token
      @user.save
      redirect '/games'
    else
      @message = "signup failed"
      erb :index
    end
  end


  def current_user
    @current_user ||= User.find_by_session_token(session[:user])
  end
end
