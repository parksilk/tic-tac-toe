before do
  if session[:user].nil?
    unless request.path_info = "/login" || request.path_info = "/signup"
      redirect '/'
    end
  end
end

get '/' do
  # Look in app/views/index.erb

  erb :index
end

get '/game' do
  redirect '/' if !current_user
  @game = Game.new

  erb :game
end

post '/login' do

  login
end

post '/signup' do
 
  signup
end

get '/games' do
  redirect '/' if !current_user
  p current_user.inspect
  current_user.inspect
end

get '/logout' do
  session.clear
  redirect '/'
end
