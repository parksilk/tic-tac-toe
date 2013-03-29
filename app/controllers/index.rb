get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/game' do
  @game = Game.new
  
  erb :game
end
