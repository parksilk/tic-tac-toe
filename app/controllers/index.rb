get '/' do
  # Look in app/views/index.erb

  erb :index
end

get '/game' do
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
  p current_user.inspect
  current_user.inspect
end
